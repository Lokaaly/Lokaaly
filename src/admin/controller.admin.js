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
	return await businessAdmin.submitVendorRequest(vendorId);
};

exports.addCategory = async (req, res) => {
	const data = req.body;
	const image = req.file; 
	return await businessAdmin.addCategory(data, image);
};

exports.updateCategory = async (req, res) => {
	const { id } = req.params;
	const { name } = req.body || {};
	let updatedData = {};
	if (req.file) updatedData.image = req.file;
	if (name) updatedData.name = name;

	return await businessAdmin.updateCategory(id, updatedData);
};

exports.deleteCategory = async (req, res) => {
	const { id } = req.params;
	return await businessAdmin.deleteCategory(id);
};