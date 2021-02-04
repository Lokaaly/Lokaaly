const businessOrder = require('./business.order');

exports.getOrdersList = async (req, res) => {
	return await businessOrder.getOrdersList(req.user._id);
};

exports.makeOrder = async (req, res) => {
	return await businessOrder.makeOrder(req.user._id, req.body);
};
