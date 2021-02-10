const businessOrder = require('./business.order');

exports.getOrdersList = async (req, res) => {
	const filter = req.query || {};
	return await businessOrder.getOrdersList(req.user._id, filter);
};

exports.getOrderById = async (req, res) => {
	const { orderId } = req.params || {};
	return await businessOrder.getOrder(req.user._id, orderId);
}

exports.makeOrder = async (req, res) => {
	return await businessOrder.makeOrder(req.user._id, req.body);
};
