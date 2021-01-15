const { CartProduct } = require('../models/model.card');
const { Product } = require('../models/model.product');

exports.getCartData = async (customerId) => {
	const cartProducts = await CartProduct.find({ customerId }).lean();
	if (cartProducts && Array.isArray(cartProducts)) {
		for (let i = 0; i < cartProducts.length; i++) {
			debugger;
			const currentProduct = await Product.findById(cartProducts[i].productId.toString()).lean();
			cartProducts[i].product = currentProduct;
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