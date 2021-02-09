const { Orders } = require('../models/model.order');
const { initializeOrderDTO } = require('./helper.order');

exports.getOrdersList = async (userId, filter) => {
	const query = { customerId: userId };
	const { skip, limit, status } = filter;
	if (status) {
		query.status = status;
	}
	let ordersPromise = Orders.find(query)
		.populate('products.productId', ['_id', 'title', 'images']);
	if (skip && limit) {
		ordersPromise = ordersPromise.skip(+skip).limit(+limit);
	}
	return await ordersPromise.lean();
};

exports.makeOrder = async (userId, data) => {
	const validatedOrder = await initializeOrderDTO(userId, data);
	const order = new Orders(validatedOrder);
	return await order.save();
};
