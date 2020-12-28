const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const vendorController = require('./controller.vendor');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');

const vendorAuth = AuthMiddleware([ROLES.VENDOR]);
// /api/vendors
router.post('/send-request', wrapAsync(vendorController.vendorRequest));
router.put('/password', vendorAuth, wrapAsync(vendorController.updatePassword));
router.post('/login', wrapAsync(vendorController.vendorLogin));

// Public
router.get('/', wrapAsync(vendorController.getVendors));
router.get('/:id', wrapAsync(vendorController.getVendorById));


module.exports = router;