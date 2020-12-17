const businessVendor = require('./business.vendor');

exports.vendorRequest = async (req, res) => {
	const data = req.body;
	return await businessVendor.sendRequestForVendorRegistration(data);
};

exports.vendorLogin = async (req, res) => {
	const data = req.body;
	return await businessVendor.vendorLogin(data);
};

exports.getVendors = async (req, res) => {
	const filter = req.query;
	return await businessVendor.getVendors(filter);
};

exports.getVendorById = async (req, res) => {
	const { id: vendorId } = req.params;
	return await businessVendor.getVendorById(vendorId);
};