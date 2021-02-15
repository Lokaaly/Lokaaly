const { Orders } = require('../models/model.order');
const { ROLES } = require('../models/static.data');
const { initializeOrderDTO } = require('./helper.order');

exports.getOrdersList = async (user, filter) => {
	const query = {};
	const { skip, limit, status, customerId, vendorId } = filter;
	switch (user.role) {
		case ROLES.VENDOR:
			query.vendorId =  user._id.toString();
			if (customerId) query.customerId = customerId;
			break; 
		case ROLES.CUSTOMER:
			query.customerId = user._id.toString();
			break;
		case ROLES.ADMIN:
			if (customerId) query.customerId = customerId;
			if (vendorId) query.vendorId = vendorId;
			break;
		default:
			throw new Error('Access denied');
	}

	if (status) query.status = status;

	let ordersPromise = Orders.find(query).sort({ 'updatedAt': -1 })
		.populate('products.productId', ['_id', 'title', 'images']);
	if (skip && limit) ordersPromise = ordersPromise.skip(+skip).limit(+limit);
	return await ordersPromise.lean();
};

exports.getOrder = async (user, orderId) => {
	const query = { _id: orderId.toString() };
	switch (user.role) {
		case ROLES.VENDOR:
			query.vendorId =  user._id.toString();
			break; 
		case ROLES.CUSTOMER:
			query.customerId = user._id.toString();
			break;
		case ROLES.ADMIN:
			console.log('Admin role orders');
			break;
		default:
			throw new Error('Access denied');
	}

	const order = await Orders.findOne(query)
		.populate('products.productId')
		.populate('vendorId', ['_id', 'vendor']).lean();
	return order;
};

exports.makeOrder = async (userId, data) => {
	const validatedOrder = await initializeOrderDTO(userId, data);
	const order = new Orders(validatedOrder);
	return await order.save();
};

exports.orderAction = async (user, data) => {
	return [];
};
