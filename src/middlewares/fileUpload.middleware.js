import multer from 'multer';
import { log } from 'console';
import path from 'path';

let allowedFileextension = ['.png', '.jpeg', '.jpg', '.pdf'];

const fileFilter = (req, file, cb) => {
  log(file);
  if (allowedFileextension.includes(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(
      new Error('invalid file name!, Only .png, .jpeg, jpg are allowed.'),
      false,
    );
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

export const upload = multer({
  storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
  fileFilter,
});
