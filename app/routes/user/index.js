"use strict";

const express = require("express");
const UserController = require("../../controllers/user");
const { controllerHandler } = require("../../middlewares/controller-handler");
const c = controllerHandler;

const passport = require("passport");
const passportConf = require("../../services/auth/passport");
const passportUsersLocal = passport.authenticate("local-users", {
  session: false
});
const passportUsersJWT = passport.authenticate("jwt-users", { session: false });

let router = express.Router();

router.post(
  "/users/register",
  c(UserController.register, (req, res, next) => [
    req.body.email,
    req.body.password
  ])
);

router.post(
  "/users/login",
  passportUsersLocal,
  c(UserController.login, (req, res, next) => [req.user])
);

router.post(
  "/users/logout",
  passportUsersJWT,
  c(UserController.logout, (req, res, next) => [req.params.id])
);

// router.post(
//   "/users/google",
//   passport.authenticate("googleToken", { session: false }),
//   UserController.googleOAuth
// );

// router.post(
//   "/users/facebook",
//   passport.authenticate("facebookToken", { session: false }),
//   UserController.facebookOAuth
// );

router.get(
  "/users/verify",
  c(UserController.verifyEmail, (req, res, next) => [req.query.token])
);

router.get("/users", c(UserController.getAll));

router.get(
  "/users/:id",

  c(UserController.getOne, (req, res, next) => [req.params.id])
);

router.put(
  "/users/update/:id",
  c(UserController.update, (req, res, next) => [req.params.id, req.body.params])
);

router.post(
  "/users/delete/:id",
  c(UserController.delete, (req, res, next) => [req.params.id])
);

module.exports = router;
