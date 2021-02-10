const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const ordersController = require('./controller.order');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');

const CustomerAuth = AuthMiddleware([ROLES.CUSTOMER]);

// /api/orders
router.get('/', CustomerAuth, wrapAsync(ordersController.getOrdersList));
router.get('/:orderId', CustomerAuth, wrapAsync(ordersController.getOrderById));
router.post('/', CustomerAuth, wrapAsync(ordersController.makeOrder));

module.exports = router;