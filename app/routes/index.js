"use strict";

const express = require("express");
const UserRoutes = require("./user");
const customerRoutes = require("./customer");

let router = express.Router();

router.use(UserRoutes);
router.use(customerRoutes);
// router.use('/products', productController);

module.exports = router;
