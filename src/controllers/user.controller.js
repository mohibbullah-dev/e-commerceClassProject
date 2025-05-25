import {
  APP_URL,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_SCOPES,
  GOOGLE_OAUTH_URL,
  GOOGLE_TOKEN_INFO_URL,
  JWT_SECRET,
} from '../constant.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import {
  otpVerificationEmailFormat,
  sendEmail,
  varifyEmailMailFormate,
} from '../utils/mail.js';
import { fileUpload } from '../utils/fileUpload.js';

const signup = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw ApiError.badrequest('username already exists!');
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw ApiError.badrequest('email already exists');
  }

  const createdUser = await User.create({ username, name, email, password });
  // fetch data without sensetive field
  const user = await User.findById(createdUser._id).select(
    '-password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
  );

  const token = user.jwtToken();
  const verifyUrl = `${APP_URL}/api/v1/users/verify/?token=${token}`;
  sendEmail({
    email,
    subject: 'Verify your email.',
    mailFormate: varifyEmailMailFormate(name, verifyUrl),
  });

  res.status(200).json(ApiSuccess.created('user created', user));
});

const VerifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) throw ApiError.badrequest('token is required');

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw ApiError.unauthorized('invalid or expire access token.');
  }

  const user = await User.findById(decodedToken.id).select(
    '-__v -password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
  );

  if (!user) throw ApiError.badrequest('user not found');

  if (user.isVarified) {
    res.status(200).json(ApiSuccess.ok('user already varified', user));
  } else {
    user.isVarified = true;
    await user.save();

    return res.status(200).json(ApiSuccess.ok('user verified', user));
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('email id: ', email);
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound('invalid credentials');
  if (user.isVarified === false) throw ApiError.forbiden('user not varified.');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.notFound('invalid credentials');

  const accessToken = user.accessToken();
  const refreshToken = user.refreshToken();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  };

  return res
    .cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(ApiSuccess.ok('user signed in', { accessToken, refreshToken }));
});

const signOut = asyncHandler(async (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json(ApiSuccess.ok('user signOur successfully'));
});

// signWithGoogle starts

const signingWithGoogle = asyncHandler(async (req, res) => {
  const state = 'some_state';
  const scopes = GOOGLE_OAUTH_SCOPES.join(' ');
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

const GoogleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;

  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_CALLBACK_URL,
    grant_type: 'authorization_code',
  };

  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();
  const { id_token } = access_token_data;
  const token_info_response = await fetch(
    `${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`,
  );
  const token_info = await token_info_response.json();

  const userCreated = await User.findOneAndUpdate(
    {
      email: token_info.email,
    },
    {
      username: (
        token_info.name + Math.floor(1000 + Math.random() * 9000)
      ).replace(' ', ''),
      name: token_info.name,
      email: token_info.email,
      isVarified: token_info.email_verified,
      accountType: 'google',
      avatar: {
        url: token_info.picture,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  const user = await User.findById(userCreated._id).select(
    '-__v -password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
  );

  const accessToken = user.accessToken();
  const refreshToken = user.refreshToken();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  };

  return res
    .cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(token_info_response.status)
    .json(
      ApiSuccess.ok(
        `user sigined in accessToken:${accessToken}, refreshToken:${refreshToken}`,
      ),
    );
});

// signWithGoogle ends here

const UpdateUser = asyncHandler(async (req, res) => {
  const { username, name, email } = req.body;
  const user = await User.findById(req.user._id);

  if (user.username !== username) {
    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists) {
      throw ApiError.badrequest('username already exists');
    } else {
      user.username = username;
    }
  }

  if (user.email !== email) {
    const isEmialExists = await User.findOne({ email });
    if (isEmialExists) {
      throw ApiError.badrequest('email already exists');
    } else {
      user.isVarified = false;
      user.email = email;
      const token = user.jwtToken();
      const verifyUrl = `${APP_URL}/api/v1/users/verify/?token=${token}`;
      sendEmail({
        email,
        subject: 'Verify your email.',
        mailFormate: varifyEmailMailFormate(name, verifyUrl),
      });
    }
  }
  user.name = name;
  await user.save();
  res.status(200).json(ApiSuccess.ok('user Updated', user));
});
const userPasswordUpadate = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;
  if (oldPassword === newPassword) {
    throw ApiError.badrequest('New password can not be same as oldPassword');
  }
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw ApiError.badrequest('old password is incorrect');
  }
  user.password = newPassword;
  // console.log('updated password:', user.password);
  await user.save();
  res.status(200).json(ApiSuccess.ok('password update'));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound('user not found.');
  const otp = Math.floor(1000 + Math.random() * 9000);

  sendEmail({
    email,
    subject: 'Reset password',
    mailFormate: otpVerificationEmailFormat(otp),
  });
  user.passwordResetToken = otp;
  user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  await user.save();
  return res.status(200).json(ApiSuccess.ok('otp sent'));
});

const validateOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await User.findOne({ passwordResetToken: otp });
  if (!user) throw ApiError.notFound('invalid otp.');
  if (user.passwordResetExpires < Date.now())
    throw ApiError.notFound('invalid otp.');

  return res.status(200).json(ApiSuccess.ok('otp verified.'));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { otp, password } = req.body;
  const user = await User.findOne({ passwordResetToken: otp });
  if (!user) throw ApiError.notFound('invalid otp.');
  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();
  return res.status(200).json(ApiSuccess.ok('password reseted.'));
});

const avatarUpload = asyncHandler(async (req, res) => {
  const avatar = req.file;
  const user = req.user;
  const result = await fileUpload(avatar.path, {
    folder: 'avatar',
    use_filenames: true,
    unique_filename: true,
    overwrite: true,
    resource_type: 'image',
    transformation: [
      { width: 300, height: 300, crop: 'fill', gravity: 'face' },
      { radius: 'max' },
    ],
    public_id: req.user._id,
  });

  user.avatar = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  return res.status(200).json(ApiSuccess.ok('file Uploaded.', user));
});

const me = asyncHandler(async (req, res) => {
  return res.status(200).json(ApiSuccess.ok('user found.', req.user));
});

export {
  signup,
  VerifyEmail,
  signin,
  signOut,
  UpdateUser,
  userPasswordUpadate,
  forgotPassword,
  validateOtp,
  resetPassword,
  signingWithGoogle,
  GoogleCallback,
  avatarUpload,
  me,
};
