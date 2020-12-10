const businessVendor = require('./business.vendor');

exports.getVendors = async (req, res) => {
	const filter = req.query;
	return await businessVendor.getVendors(filter);
};

exports.getVendorById = async (req, res) => {
	const { id: vendorId } = req.params;
	return await businessVendor.getVendorById(req);
};