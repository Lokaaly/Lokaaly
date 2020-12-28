const express = require('express');
const router = express.Router();
const adminController = require('./controller.admin');
const { ROLES } = require('../models/static.data');
const { wrapAsync } = require('../middlewares/handler.wrapper');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { uploader } = require('../middlewares/multer');


const AdminAuth = AuthMiddleware([ROLES.ADMIN]);

// BASE ROUTE - /api/admin
router.post('/login', wrapAsync(adminController.login));
router.get('/vendors', AdminAuth, wrapAsync(adminController.getVendors));
router.get('/vendors/:vendorId', AdminAuth, wrapAsync(adminController.getVendorById));
router.put('/vendors/:vendorId/confirm', AdminAuth, wrapAsync(adminController.activateVendor));

// Category
router.post('/category', AdminAuth, uploader().single('image'), wrapAsync(adminController.addCategory));
router.put('/category/:id', AdminAuth, uploader().single('image'), wrapAsync(adminController.updateCategory));
router.delete('/category/:id', AdminAuth, wrapAsync(adminController.deleteCategory));

module.exports = router;