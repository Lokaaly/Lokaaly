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
	const { _id: vendorId } = req.user;
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
