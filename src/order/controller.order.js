const businessOrder = require('./business.order');

exports.getOrdersList = async (req, res) => {
	const filter = req.query || {};
	return await businessOrder.getOrdersList(req.user, filter);
};

exports.getOrderById = async (req, res) => {
	const { orderId } = req.params || {};
	return await businessOrder.getOrder(req.user, orderId);
}

exports.makeOrder = async (req, res) => {
	return await businessOrder.makeOrder(req.user._id, req.body);
};

exports.orderActionByVendor = async (req, res) => {
	return await businessOrder.orderActionByVendor(user, req.body);
};