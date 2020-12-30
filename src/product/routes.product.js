const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../middlewares/handler.wrapper');
const productController = require('./controller.product');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ROLES } = require('../models/static.data');
const { uploader } = require('../middlewares/multer');

const VendorAuth = AuthMiddleware([ROLES.VENDOR]);
const CustomerAuth = AuthMiddleware([ROLES.CUSTOMER]);

// BASE: - /api/products
router.get('/', wrapAsync(productController.getVendorProducts));
router.get('/:id', wrapAsync(productController.getProductById));
router.post('/', VendorAuth, uploader().array('images'), wrapAsync(productController.addProduct));
router.put('/', VendorAuth, uploader().array('$pushImages'), wrapAsync(productController.updateProduct));
router.delete('/:id', VendorAuth, wrapAsync(productController.removeProduct));

router.put('/favourite/:id', CustomerAuth, wrapAsync(productController.setFavouriteProduct));

module.exports = router;