const businessVendor = require('./business.vendor');
const { transpose } = require('dataobject-parser');

exports.vendorRequest = async (req, res) => {
	const { _data: data } = transpose(req.body);
	data.vendor.license = req.file;
	return await businessVendor.sendRequestForVendorRegistration(data);
};

exports.updatePassword = async (req, res) => {
	const { password } = req.body;
	if (!password) throw new Error('Password is not set');
	return await businessVendor.updateVendorPassword(req.user, password);
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

exports.updateVendor = async (req, res) => {
	const vendor = req.user;
	const data = req.body;
	const files = req.files; // $pushImages, profileImage
	return await businessVendor.updateVendor(vendor, data, files);
};