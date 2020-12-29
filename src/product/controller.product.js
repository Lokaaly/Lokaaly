const businessProduct = require('./business.product');

exports.getVendorProducts = async (req, res) => {
	const filter = req.query;
	return await businessProduct.getProductsList(filter);
};

exports.getProductById = async (req, res) => {
	const { id } = req.params;
	return await businessProduct.getProduct(id);
};

exports.addProduct = async (req, res) => {
	debugger;
	const { _id: vendorId } = req.user;
	const addons = JSON.parse(req.body.addons || '[]');
	req.body.addons = addons;
	const data = { ...req.body };
	if (req.files) data.images = req.files;
	return await businessProduct.addProduct(vendorId, data);
};

exports.updateProduct = async (req, res) => {
	const { _id: vendorId } = req.user;
	return await businessProduct.updateProduct(vendorId, data);
};

exports.removeProduct = async (req, res) => {
	const { _id: vendorId } = req.user;
	const { id: productId } = req.params;
	return await businessProduct.removeProduct(vendorId, productId);
};


exports.setFavouriteProduct = async (req, res) => {
	const { id: productId } = req.params;
	return await businessProduct.setUnsetFavourite(req.user, productId);
};