const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const userController = require('./controller.user');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/model.user');
const { ResetPasswordMiddleware } = require('../middlewares/resetPasswordValidator');

const CustomerAuth = AuthMiddleware([ROLES.CUSTOMER]);

// /api/users
router.post('/login', wrapAsync(userController.userLogin));
router.post('/sign-up', wrapAsync(userController.userSignUp));
router.get('/verify', CustomerAuth, wrapAsync(userController.activateAccount));
router.get('/profile', CustomerAuth, wrapAsync(userController.getProfile));
router.put('/profile', wrapAsync(userController.updateProfile));

// Reset password
router.post('/forget-password', wrapAsync(userController.forgetPassword));
router.post('/validate-reset-code', wrapAsync(userController.validatePasswordResetCode));
router.post('/change-password', ResetPasswordMiddleware(), wrapAsync(userController.changeForgottenPassword));

// Social media authentication
router.post('/facebook', wrapAsync(userController.facebookAuth));
router.post('/google', wrapAsync(userController.googleAuth));

// Test endpoint - dev env
if (process.env.NODE_ENV === 'development') {
	router.post('/test', wrapAsync(userController.testFunc));
}

module.exports = router;