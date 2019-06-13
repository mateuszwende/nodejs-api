const express = require('express');
const HomeRoutes = require('./home');
const UserRoutes = require('./user');

const router = express.Router();

router.use(HomeRoutes);
router.use(UserRoutes);

module.exports = router;
