const _ = require('lodash');
const rp = require('request-promise');
const { Orders } = require('../models/model.order');
const { User } = require('../models/model.user');

exports.generatePaymentUrl = async (customerId, orderId) => {
	const currentOrder = await Orders.findOne({ _id: orderId, customerId: customerId.toString() }).lean();
	if (!currentOrder) throw new Error('Invalid customer order');
	if (currentOrder.status !== 'accepted') throw new Error('Order is not accepted by vendor');
	if (currentOrder.paymentMethod !== 1) throw new Error('Invalid payment method');

	const currentCustomer = await User.findById(customerId.toString()).lean();
	const activeShippingAddress = currentCustomer.shippingAddresses.find(sa => sa.isPrimary === true);

	let options = {
		method: "POST",
		uri: "https://secure-global.paytabs.com/payment/request",
		body: {
			"profile_id": process.env.PAYTABS_PROFILE_ID,
			"tran_type": "sale",
			"tran_class": "ecom",
			"cart_id": orderId,
			"cart_description": `Order - ${currentOrder.orderNumber}`,
			"cart_currency": "AED",
			"hide_shipping": true,
			// "framed": true,
			"cart_amount": currentOrder.total,
			"callback": `${process.env.API_HOST}/api/paytabs/callback`,
			"customer_details": {
				"name": `${currentCustomer.firstName} ${currentCustomer.lastName}`,
				"email": currentCustomer.email,
				"street1": activeShippingAddress ? activeShippingAddress.formatedAddress : '',
				"city": "Dubai",
				"state": "DU",
				"country": "AE"
			}
		},
		headers: {
			"authorization": process.env.PAYTABS_SECRET_KEY,
			"content-type": "application/json"
	 },
		json: true
	};

	const response = await new Promise((resolve, reject) => {
		rp(options).then(data => {
			resolve(data);
		}).catch(err => { reject(err); })
	});
	// const updatedOrder = await Orders.findOneAndUpdate({ _id: orderId }, { paytabsTransaction: response }, { new : true });
	// return updatedOrder;
	return response;
};

exports.paymentCallback = async () => {
	debugger;
};
