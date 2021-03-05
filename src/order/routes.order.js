const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const ordersController = require('./controller.order');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');

const CustomerAuth = AuthMiddleware([ROLES.CUSTOMER]);
const VendorAuth = AuthMiddleware([ROLES.VENDOR]);
const MultiAuth = AuthMiddleware([ROLES.ADMIN, ROLES.VENDOR, ROLES.CUSTOMER]);

// /api/orders
router.get('/', MultiAuth, wrapAsync(ordersController.getOrdersList));
router.get('/:orderId', MultiAuth, wrapAsync(ordersController.getOrderById));
router.post('/', CustomerAuth, wrapAsync(ordersController.makeOrder));

router.post('/vendor-action', VendorAuth, wrapAsync(ordersController.orderActionByVendor));

module.exports = router;