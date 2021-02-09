const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PAYMENT_METHODS = {
	CASH: 0,
	CARD: 1
};

const ORDER_STATUSES = {
	PENDING: 'pending',
	REJECTED: 'rejected',
	ACCEPTED: 'accepted',
	PAID: 'paid'
};

const orderProductSchema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	addons: {
		type: Schema.Types.Mixed
	},
	size: String,
	orderDate: {
		type: Schema.Types.Date
	},
	comment: String,
	quantity: Number,
	unitPrice: String
}, {
	_id: false
});

// ----------------->> Order SCHEMA <<----------------------------------
const OrderSchema = new Schema({
	orderNumber: {
		type: String,
		required: true,
		unique: true
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
	},
	shippingPrice: String,
	subTotal: String,
	total: String,
}, {
	versionKey: false,
	timestamps: true,
});

const Orders = mongoose.model('Order', OrderSchema);

module.exports = {
	Orders,
	ORDER_STATUSES
};