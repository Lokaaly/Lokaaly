const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const productController = require('./controller.product');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');

const VendorAuth = AuthMiddleware([ROLES.VENDOR]);


// BASE: - /api/products
router.get('/', wrapAsync(productController.getVendorProducts));
router.get('/:id', wrapAsync(productController.getProductById));
router.post('/', VendorAuth, wrapAsync(productController.addProduct));
router.put('/', VendorAuth, wrapAsync(productController.updateProduct));
router.delete('/:id', VendorAuth, wrapAsync(productController.removeProduct));

module.exports = router;