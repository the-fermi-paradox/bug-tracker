const logger = require('../helpers/logger');

const crashOrRespond = (err, res) => {
  const { isOperational, statusCode, message } = err;
  // If we have a response, send one now
  if (res) {
    res.status(statusCode ?? 500).json({
      status: 'error',
      statusCode: statusCode ?? 500,
      message,
    });
  }
  // Exit the process with a failed error code if this is a programmer error
  if (!isOperational) {
    logger.fatal(err);
    process.exit(1);
  } else {
    logger.error(err);
  }
};

const handleError = (err, res) => {
  crashOrRespond(err, res);
};

module.exports = handleError;
