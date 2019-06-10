"use strict";

const express = require("express");
let router = express.Router();
const controllers = require("../../controllers/customer");
const { controllerHandler } = require("../../middlewares/controller-handler");
const c = controllerHandler;

router.get("/customers/all", c(controllers.getcustomers));
router.get(
  "/customers/one/:id",
  c(controllers.getCustomer, (req, res, next) => [req.params.id])
);
router.get(
  "/customers/verify",
  c(controllers.verifyCustomer, (req, res, next) => [req.query.token])
);
router.post(
  "/customers/register",
  c(controllers.registerCustomer, (req, res, next) => [
    req.body.email,
    req.body.password
  ])
);
router.post("/customers/login", c(controllers.loginCustomer));
router.post(
  "/customers/update/:id",
  c(controllers.updateCustomer, (req, res, next) => [
    req.params.id,
    req.body.params
  ])
);
router.post(
  "/customers/delete/:id",
  c(controllers.deleteCustomer, (req, res, next) => [req.params.id])
);

module.exports = router;
