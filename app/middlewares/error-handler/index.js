const errors = require('../../utils/errors');

/**
 * Catch all invalid routes and pass it on to the error handler.
 */
exports.invalidRoute = (req, res, next) => {
  next(errors.notValidRoute());
};

/**
 * Checks to see if there are MongoDB/mongoose validation errors.
 * If none exists then the request is passed to the next error handler.
 */
exports.validationErrors = (error, req, res, next) => {
  if (!error.errors) {
    next(error);
    return;
  }
  const { errors } = error;
  Object.keys(errors).forEach(key => delete errors[key].properties);
  res.status(400).json({
    success: false,
    status: 400,
    error: errors,
  });
};

/**
 * The last error handler in the chain. Formats the error based
 * on the `NODE_ENV` environment variable.
 */
exports.displayErrors = (error, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const err = error;
  const status = err.status || 500;
  delete err.status;
  err.message = err.message || 'Something went wrong.';

  if (process.env.NODE_ENV === 'production') {
    delete err.stack;
  } else {
    err.stack = err.stack || '';
  }

  res.status(status).json({
    success: false,
    status,
    error: {
      message: err.message,
    },
  });
};
