const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PAYMENT_METHODS = {
	CASH: 0,
	CARD: 1
};

const ORDER_STATUSES = {
	PENDING: 'pending',
	REJECTED: 'rejected',
	ACCEPTED: 'accepted'
};

const orderProductSchema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: 'product',
		required: true
	},
	addons: {
		type: Schema.Types.Mixed
	},
	size: String,
	orderDate: {
		type: Schema.Types.Date
	},
	quantity: Number,
});

// ----------------->> Order SCHEMA <<----------------------------------
const OrderSchema = new Schema({
	orderId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	vendorId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	shippingAddressId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	paymentMethod: {
		type: Number,
		enum: Object.values(PAYMENT_METHODS)
	},
	products: [orderProductSchema],
	status: {
		type: String,
		enum: Object.values(ORDER_STATUSES)
	}
}, {
	versionKey: false,
	timestamps: true,
});

const Orders = mongoose.model('Order', OrderSchema);

module.exports = {
	Orders,
};