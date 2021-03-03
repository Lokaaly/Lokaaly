const businessCart = require('./business.cart');

exports.getCartData = async (req, res) => {
	return await businessCart.getCartData(req.user._id);
};

exports.getCartProductById = async (req, res) => {
	const { cartProductId } = req.params || {};
	return await businessCart.getCartProductById(req.user._id, cartProductId);
};

exports.addToCart = async (req, res) => {
	return await businessCart.addToCart(req.user._id, req.body);
};

exports.updateProductCart = async (req, res) => {
	const { cartProductId } = req.params || {};
	const data = req.body;
	return await businessCart.updateProductCart(req.user._id, cartProductId, data);
};

exports.deleteCart = async (req, res) => {
	const userId = req.user._id;
	const { productId } = req.query || {};
	return await businessCart.remove(userId, productId);
};