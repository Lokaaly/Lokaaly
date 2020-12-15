const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const userController = require('./controller.user');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/model.user');

const CustomerAuth = AuthMiddleware([ROLES.CUSTOMER]);

// /api/users
router.post('/login', wrapAsync(userController.userLogin));
router.post('/sign-up', wrapAsync(userController.userSignUp));
router.get('/verify', CustomerAuth, wrapAsync(userController.activateAccount));

module.exports = router;