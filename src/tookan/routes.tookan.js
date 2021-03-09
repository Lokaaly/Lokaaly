const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { uploader } = require('../middlewares/multer');
const { ROLES } = require('../models/static.data');
const tookanController = require('./controller.tookan');

const adminAuth = AuthMiddleware([ROLES.ADMIN]);

// /api/tookan
router.get('/agents', adminAuth, wrapAsync(tookanController.getAgentsList));
router.get('/agents/:agentId', adminAuth, wrapAsync(tookanController.getAgentById));
router.put('/agents/:agentId', adminAuth, wrapAsync(tookanController.updateAgentById));

router.post('/agents/sign-up',
	uploader().fields([{ name: 'passport', maxCount: 1 }, { name: 'drivingLicense', maxCount: 1 }]),
	wrapAsync(tookanController.sendRequestForAgentRegistration));

module.exports = router;