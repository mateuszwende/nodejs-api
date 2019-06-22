const { UserService } = require('../../services');
const authService = require('../../services/auth');
const { sendVerificationTokenEmail } = require('../../modules/smtp-transporter');
const ApiResult = require('../../utils/ApiResult');
const errors = require('../../utils/errors');

module.exports = {
  register: async (email, password) => {
    if (!email) {
      throw errors.isRequired('Email');
    } else if (!password) {
      throw errors.isRequired('Password');
    }

    const user = await UserService.getByEmail(email);

    if (user) {
      throw errors.alreadyExists('User');
    }

    // User creation process
    const newUser = await UserService.create(email, password);
    newUser.emailToken = UserService.generateEmailToken();
    await UserService.save(newUser);

    // Send verification token
    await sendVerificationTokenEmail(newUser.email, newUser.emailToken);

    // Create jwt token
    const jwtToken = await authService.jwtSign(newUser.id);

    return new ApiResult({ newUser, jwtToken }, 201);
  },

  facebookOAuth: (user) => {
    const jwtToken = authService.jwtSign(user.id);

    return new ApiResult({ user, jwtToken }, 200);
  },

  login: async (user) => {
    if (!user) {
      throw errors.notFound('User');
    }

    const token = await authService.jwtSign(user.id);

    return new ApiResult({ token }, 200);
  },

  logout: async () => new ApiResult(null, 200),

  verifyEmail: async (token) => {
    if (!token) {
      throw errors.notProvided('Token');
    }

    const user = await UserService.verifyEmail(token);

    if (!user) {
      throw errors.notFound('User');
    } else if (user.isVerified) {
      throw errors.alreadyVerified('User');
    }

    user.isVerified = true;
    await UserService.save(user);

    return new ApiResult(null, 200);
  },

  getAll: async () => {
    const users = await UserService.getAll();
    return new ApiResult(users, 200);
  },

  getOne: async (id) => {
    const user = await UserService.getById(id);

    if (!user) {
      throw errors.notFound('User');
    }

    return new ApiResult(user, 200);
  },

  update: async (id, params) => {
    const user = await UserService.getById(id);

    if (!user) {
      throw errors.notFound('User');
    }

    // // TODO: Change to function
    Object.keys(params).forEach((param) => {
      user[param] = params[param];
    });

    const updatedUser = await UserService.save(user);

    return new ApiResult(updatedUser, 200);
  },

  delete: async (id) => {
    const success = await UserService.delete(id);

    if (!success) {
      throw errors.deleteFail('User');
    }

    return new ApiResult(null, 200);
  },
};
