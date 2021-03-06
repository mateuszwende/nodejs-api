module.exports = {
  alreadyExists: (item) => {
    const error = new Error(`This ${item} already exists.`);
    error.status = 400;
    return error;
  },
  alreadyVerified: (item) => {
    const error = new Error(`This ${item} is already verified.`);
    error.status = 400;
    return error;
  },
  deleteFail: (item) => {
    const error = new Error(`${item} deletion failed.`);
    error.status = 400;
    return error;
  },
  isRequired: (item) => {
    const error = new Error(`${item} is required.`);
    error.status = 400;
    return error;
  },
  notFound: (item) => {
    const error = new Error(`${item} doesn't exist.`);
    error.status = 404;
    return error;
  },
  notValid: (name) => {
    const error = new Error(`${name} is not valid.`);
    error.status = 400;
    return error;
  },
  notValidRoute: () => {
    const error = new Error('The route is not valid.');
    error.status = 404;
    return error;
  },
  notProvided: (name) => {
    const error = new Error(`${name} is not provided.`);
    error.status = 400;
    return error;
  },
  unauthorized: () => {
    const error = new Error('You are unauthorized to view this data.');
    error.status = 403;
    return error;
  },
  wrongCredentials: () => {
    const error = new Error('Wrong credentials.');
    error.status = 400;
    return error;
  },
};
