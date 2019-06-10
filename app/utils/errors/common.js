module.exports = {
  notFound: item => {
    const error = new Error(`${item} doesn't exist.`);
    error.status = 404;
    return error;
  },
  notValid: name => {
    const error = new Error(`${name} is not valid.`);
    error.status = 400;
    return error;
  },
  notProvided: name => {
    const error = new Error(`${name} is not provided.`);
    error.status = 400;
    return error;
  },
  alreadyExists: item => {
    const error = new Error(`This ${item} already exists.`);
    error.status = 403;
    return error;
  },
  alreadyVerified: item => {
    const error = new Error(`This ${item} is already verified.`);
    error.status = 403;
    return error;
  },
  wrongCredentials: () => {
    const error = new Error(`Wrong credentials.`);
    error.status = 400;
    return error;
  },
  deleteFail: item => {
    const error = new Error(`${item} deletion failed.`);
    error.status = 400;
    return error;
  }
};
