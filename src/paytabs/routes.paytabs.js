const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');
const paytabsController = require('./controller.paytabs');

const customerAuth = AuthMiddleware([ROLES.CUSTOMER]);

// /api/paytabs
router.post('/generate-url', customerAuth, wrapAsync(paytabsController.generatePaymentUrl));
router.post('/callback', wrapAsync(paytabsController.paymentCallback));

module.exports = router;