const express = require('express');
const router = express.Router();
const staticController = require('./controller.static');
const { wrapAsync } = require('../middlewares/handler.wrapper');

// Category
router.get('/categories', wrapAsync(staticController.getCategories));

module.exports = router;