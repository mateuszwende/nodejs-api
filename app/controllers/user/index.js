const { UserService } = require('../../services');
// const { sendMailService } = require('../../services/mailer');
const authService = require('../../services/auth');

const ApiResult = require('../../utils/ApiResult');
const commonErrors = require('../../utils/errors/common');

module.exports = {
  register: async (email, password) => {
    const user = await UserService.getByEmail(email);

    if (user) {
      throw commonErrors.alreadyExists('User');
    }

    const newUser = await UserService.create(email, password);

    newUser.emailToken = UserService.generateEmailToken();

    await UserService.save(newUser);

    const jwtToken = await authService.jwtSign(newUser);

    //   await sendMailService({
    //     from: '"BestBefore" <matikkk2222@o2.pl>',
    //     to: "matwende@gmail.com",
    //     subject: "Hello ✔",
    //     html: `<h4>Welcome on the board!</h4>
    //   <p>Please verify your email by clicking on this link: <br/>
    //   <form method="POST" action="${process.env.URL}/api/user/verify"

    //   <button type="submit">Verify</button>
    //   </form>
    //   <a href="${process.env.URL}/api/user/verify?token=${secretToken}">
    //   ${process.env.URL}/api/user/verify?token=${secretToken}</a></p>
    // `
    //   });

    return new ApiResult({ newUser, jwtToken }, 201);
  },

  login: async (user) => {
    console.log('login user', user);

    if (!user) {
      throw commonErrors.notFound('User');
    }

    const token = await authService.jwtSign(user);

    return new ApiResult({ token }, 200);
  },

  logout: async () => new ApiResult(null, 200),

  verifyEmail: async (token) => {
    if (!token) {
      throw commonErrors.notProvided('Token');
    }

    const user = await UserService.verifyEmail(token);

    if (!user) {
      throw commonErrors.notFound('User');
    } else if (user.isVerified) {
      throw commonErrors.alreadyVerified('User');
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
      throw commonErrors.notFound('User');
    }

    return new ApiResult(user, 200);
  },

  update: async (id, params) => {
    const user = await UserService.getById(id);

    if (!user) {
      throw commonErrors.notFound('User');
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
      throw commonErrors.deleteFail('User');
    }

    return new ApiResult(null, 200);
  },
};
