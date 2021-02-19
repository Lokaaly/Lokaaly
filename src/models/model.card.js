const mongoose = require('mongoose');
const { Product } = require('./model.product');
const Schema = mongoose.Schema;

// ----------------->> Cart SCHEMA <<----------------------------------
const CartProductSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	productId: {
		type: Schema.Types.ObjectId,
		ref: 'product',
		required: true
	},
	addons: {
		type: Schema.Types.Mixed
	},
	size: String,
	comment: String,
	quantity: Number,
}, {
	versionKey: false,
	timestamps: true,
});

// ------------> HOOKS <---------------
CartProductSchema.pre('save', async function () {
	let cartProduct = this;

	if (cartProduct.isNew) {
		debugger;
		const exProduct = await Product.findById(cartProduct.productId).lean();

		// Check product validity
		if (!exProduct) throw new Error('Product doesn\'t exist.');
		for (const cartAddon of cartProduct.addons) {
			const validAddonFromProduct = exProduct.addons.find(ad => ad._id.toString() === cartAddon._id.toString());
			if (!validAddonFromProduct) throw new Error('Invalid add on provided');
			const optionsFromProduct = validAddonFromProduct.options.map(op => op._id.toString());
			const invalidOption = cartAddon.options.find((op) => !optionsFromProduct.includes(op));

			if (invalidOption) throw new Error('Invalid add on option');
		}
	}
});

const CartProduct = mongoose.model('CartProduct', CartProductSchema);

module.exports = {
	CartProduct,
};