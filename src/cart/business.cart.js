const { CartProduct } = require('../models/model.card');
const { Product } = require('../models/model.product');

exports.getCartData = async (customerId) => {
	const cartProducts = await CartProduct.find({ customerId }).lean();
	if (cartProducts && Array.isArray(cartProducts)) {
		for (let i = 0; i < cartProducts.length; i++) {
			const cartProd = cartProducts[i];
			const currentProd = await Product.findById(cartProd.productId.toString()).lean();

			cartProd.addons.forEach((cartAd, cartAdI) => {
				const updatedCartAd = currentProd.addons.find(currAd => cartAd._id.toString() === currAd._id.toString());
				if (updatedCartAd) {
					const filteredOptions = [];
					updatedCartAd.options = updatedCartAd.options.filter(op => cartAd.includes(_id.toString()));
				}
			});
			cartProducts[i].product = currentProd;
		}
	}
	return cartProducts;
};

exports.addToCart = async (customerId, data) => {
	const exCartProduct = await CartProduct.findOne({ customerId, productId: data.productId });
	if (exCartProduct) throw new Error('Product already exists, edit or remove it.');
	const cartProduct = new CartProduct({ customerId, ...data });
	const savedProd = await cartProduct.save();
	return savedProd;
};

exports.remove = async (customerId, productCartId) => {
	const removeQuery = { customerId };
	if (productCartId) removeQuery._id = productCartId; // removed specified product from cart
	return await CartProduct.remove(removeQuery);
};