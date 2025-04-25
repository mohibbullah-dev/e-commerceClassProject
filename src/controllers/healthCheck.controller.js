import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';

const healthCheck = async (_, res) => {
  try {
    const uptimeSecond = process.uptime();
    console.log(uptimeSecond);
    const upTimeFormatted = formatUptime(uptimeSecond);
    console.log(upTimeFormatted);
    res.status(200).json(
      ApiSuccess.ok(
        {
          timeStamp: new Date().toLocaleTimeString(),
          uptime: upTimeFormatted,
        },
        'server is running',
      ),
    );
  } catch (error) {
    throw ApiError.serverError(error.message);
  }
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

export { healthCheck };
