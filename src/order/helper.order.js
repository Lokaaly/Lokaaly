const { ORDER_STATUSES } = require('../models/model.order');
const { Product } = require('../models/model.product')
const { User } = require('../models/model.user');
const _ = require('lodash');

async function initializeOrderDTO(customerId, data) {
	const pickedData = _.pick(data, ['products', 'shippingAddressId', 'paymentMethod', 'deliveryDate']);
	pickedData.addonsPrice = 0;
	pickedData.subTotal = 0;
	pickedData.shippingPrice = 15;
	
	let currentVendor = null;
	if (!pickedData || !Array.isArray(pickedData.products) || pickedData.products.length === 0) throw new Error('Empty products list');
	for (const currProd of pickedData.products) {
		const exProd = await Product.findById(currProd.productId).lean();
		if (!exProd || !exProd.active) throw new Error('Product is not found');
		if (currentVendor && currentVendor.toString() !== exProd.vendorId.toString()) throw new Error('Invalid order. Mixed vendor product has been found');
		currentVendor = exProd.vendorId;
		await Promise.all(currProd.addons.map(async (currProdAd) => {
				const matchedAddon = exProd.addons.find(exAd => exAd._id.toString() === currProdAd._id.toString());
				if (matchedAddon) {
					await Promise.all(currProdAd.options.map(currOp => {
						const matchedOption = matchedAddon.options.find(prodOp => prodOp._id.toString() === currOp._id.toString());
						if (matchedOption) pickedData.addonsPrice += +matchedOption.price * currProd.quantity;
					}))
				}
		}));
		currProd.unitPrice = exProd.price;
		pickedData.subTotal += +currProd.quantity * +exProd.price;
	}

	pickedData.total = (+pickedData.subTotal +  +pickedData.shippingPrice + +pickedData.addonsPrice).toString();
	const exCustomer = await User.findById(customerId).lean();
	const validShippingAddress = exCustomer.shippingAddresses.find(sa => sa._id.toString() === pickedData.shippingAddressId);
	if (!validShippingAddress) throw new Error('Invalid shipping address');

	pickedData.orderNumber =  `#${Date.now()}`;
	pickedData.customerId = customerId.toString();
	pickedData.vendorId = currentVendor.toString();
	pickedData.status = ORDER_STATUSES.PENDING;
	if (pickedData.paymentMethod ===)

	return pickedData;
};

module.exports = {
	initializeOrderDTO,
};