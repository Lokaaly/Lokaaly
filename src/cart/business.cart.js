const { CartProduct } = require('../models/model.card');
const { Product } = require('../models/model.product');
const _ = require('lodash');
const { User } = require('../models/model.user');

exports.getCartData = async (customerId) => {
	const cartProducts = await CartProduct.find({ customerId }).lean();

	if (cartProducts && Array.isArray(cartProducts)) {
		for (let i = 0; i < cartProducts.length; i++) {
			const cartProd = cartProducts[i];
			const currentProd = await Product.findById(cartProd.productId.toString()).lean();

			const filteredAddons = [];

			cartProd.addons.forEach((cartAd) => {
				const updatedCartAd = currentProd.addons.find(currAd => cartAd._id.toString() === currAd._id.toString());
				if (updatedCartAd) {
					updatedCartAd.options = updatedCartAd.options.filter(op => cartAd.options.includes(op._id.toString()));
					filteredAddons.push(updatedCartAd);
				}
			});
			cartProducts[i].addons = filteredAddons;
			cartProducts[i].productInfo = await Product.findById(currentProd._id.toString()).lean();
		}
	}

	const groupedByVendor = [];
	const groupedCartProducts = _.groupBy(cartProducts, (cp) => cp.productInfo.vendorId);
	await Promise.all(Object.keys(groupedCartProducts).map(async (vId)=> {
		const vendorData = await User.findById(vId).select('vendor').lean();
		groupedByVendor.push({...vendorData, cart: [...groupedCartProducts[vId]]});
	}));
	return groupedByVendor;
};

exports.getCartProductById = async (customerId, cartProductId) => {
	const cartProduct = await CartProduct.findOne({ _id: cartProductId, customerId: customerId.toString()}).lean();
	return cartProduct;
};

exports.addToCart = async (customerId, data) => {
	const exCartProduct = await CartProduct.findOne({ customerId, productId: data.productId });
	if (exCartProduct) throw new Error('Product already exists, edit or remove it.');
	const cartProduct = new CartProduct({ customerId, ...data });
	const savedProd = await cartProduct.save();
	return savedProd;
};

exports.updateProductCart = async (customerId, cartProductId, upData) => {
	const pickedData = _.pick(upData, ['addons', 'comment', 'quantity']);
	const cartProduct = await CartProduct.findOneAndUpdate({ _id: cartProductId, customerId: customerId.toString()  }, { ...pickedData }).lean();
	return cartProduct;
};

exports.remove = async (customerId, productCartId) => {
	const removeQuery = { customerId };
	if (productCartId) removeQuery._id = productCartId; // removed specified product from cart
	return await CartProduct.remove(removeQuery);
};