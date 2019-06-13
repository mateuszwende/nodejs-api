const express = require('express');
const passport = require('passport');

const UserController = require('../../controllers/user');
const { controllerHandler } = require('../../middlewares/controller-handler');

const c = controllerHandler;

const passportLocalUsers = passport.authenticate('local-users', {
  session: false,
});
const passportJWTUsers = passport.authenticate('jwt-users', { session: false });
const facebookTokenUsers = passport.authenticate('facebook-token-users', { session: false });

const router = express.Router();

/* eslint no-unused-vars: ["error", { "args": "none" }] */
router.post(
  '/users/register',
  c(UserController.register, (req, res, next) => [req.body.email, req.body.password]),
);

router.post(
  '/users/login',
  passportLocalUsers,
  c(UserController.login, (req, res, next) => [req.user]),
);

router.post(
  '/users/logout',
  passportJWTUsers,
  c(UserController.logout, (req, res, next) => [req.params.id]),
);

// router.post(
//   "/users/google",
//   passport.authenticate("googleToken", { session: false }),
//   UserController.googleOAuth
// );

router.post(
  '/users/oauth/facebook',
  facebookTokenUsers,
  c(UserController.facebookOAuth, (req, res, next) => [req.user]),
);

router.get('/users/verify', c(UserController.verifyEmail, (req, res, next) => [req.query.token]));

router.get('/users', c(UserController.getAll));

router.get('/users/:id', c(UserController.getOne, (req, res, next) => [req.params.id]));

router.put(
  '/users/update/:id',
  c(UserController.update, (req, res, next) => [req.params.id, req.body.params]),
);

router.post('/users/delete/:id', c(UserController.delete, (req, res, next) => [req.params.id]));
// eslint-disable-line no-unused-vars

module.exports = router;
