const express = require('express');
const productService = require('../../services/product');

const router = express.Router();

router.post('/add', productService.addProduct);
router.post('/remove', productService.removeProduct);
router.post('/update', productService.updateProduct);

module.exports = router;
