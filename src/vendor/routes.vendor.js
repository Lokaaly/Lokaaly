const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const vendorController = require('./controller.vendor');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/model.user');

// /api/vendors
router.post('/send-request', wrapAsync(vendorController.vendorRequest));
router.post('/login', wrapAsync(vendorController.vendorLogin));
router.get('/', wrapAsync(vendorController.getVendors));
router.get('/:id', wrapAsync(vendorController.getVendorById));


module.exports = router;