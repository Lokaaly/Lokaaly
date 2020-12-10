const businessAdmin = require('./business.admin');

exports.login = async (req, res) => {
	return await businessAdmin.login(req.body);
};

exports.getVendors = async (req, res) => {
	return await businessAdmin.getVendors(req.query);
};

exports.getVendorById = async (req, res) => {
	const { vendorId } = req.params;
	return await businessAdmin.getVendorById(vendorId);
};

exports.activateVendor = async (req, res) => {
	const { vendorId } = req.params;
	return await businessAdmin.activateVendor(vendorId);
};


exports.addCategory = async (req, res) => {
	const data = req.body;
	return await businessAdmin.addCategory(data);
};

exports.updateCategory = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	return await businessAdmin.updateCategory(id, data);
};