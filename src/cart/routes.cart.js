const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const cartController = require('./controller.cart');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');

const CustomerAuth = AuthMiddleware([ROLES.CUSTOMER]);

// /api/cart
router.get('/', CustomerAuth, wrapAsync(cartController.getCartData));
router.get('/:cartProductId', CustomerAuth, wrapAsync(cartController.getCartProductById));
router.post('/', CustomerAuth, wrapAsync(cartController.addToCart));
router.put('/:cartProductId', CustomerAuth, wrapAsync(cartController.updateProductCart));
router.delete('/', CustomerAuth, wrapAsync(cartController.deleteCart));

module.exports = router;