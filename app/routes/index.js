const express = require('express');
const HomeRoutes = require('./home');
const UserRoutes = require('./user');
const customerRoutes = require('./customer');

const router = express.Router();

router.use(HomeRoutes);
router.use(UserRoutes);
router.use(customerRoutes);
// router.use('/products', productController);

module.exports = router;
