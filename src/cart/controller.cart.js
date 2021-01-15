const businessCart = require('./business.cart');

exports.getCartData = async (req, res) => {
	return await businessCart.getCartData(req.user._id);
};

exports.addToCart = async (req, res) => {
	return await businessCart.addToCart(req.user._id, req.body);
};

exports.deleteCart = async (req, res) => {
	const userId = req.user._id;
	const { productId } = req.query || {};
	return await businessCart.remove(userId, productId);
};