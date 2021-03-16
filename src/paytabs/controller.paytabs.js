const businessPaytabs = require('./business.paytabs');

exports.generatePaymentUrl = async (req, res) => {
	const customerId = req.user._id;
	const { orderId } = req.body;
	return await businessPaytabs.generatePaymentUrl(customerId, orderId);
};

exports.paymentCallback = async (req, res) => {
	return await businessPaytabs.paymentCallback();
}
