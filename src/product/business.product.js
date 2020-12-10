const { Product } = require('../models/model.product');
const { MS } = require('../custom.errors');
const { VENDOR_STATUSES } = require('../models/model.user');

exports.getProductsList = async (vendorId, filter) => {
	const { skip = 0, limit = 10 } = filter;
	const products = await Product.find({ vendorId }).skip(skip).limit(limit).lean();
	return products;
};

exports.getProduct = async (id) => {
	const product = await Product.findById(id);
	return product;
};

exports.addProduct = async (vendorId, data) => {
	const product = new Product({ vendorId, ...data });
	const creatResult = await product.save();
	return creatResult;
};

exports.updateProduct = async (vendorId, data) => {
	const updData = await Product.findOneAndUpdate({ vendorId }, { ...data });
	return updData;
};

exports.removeProduct = async (vendorId) => {
	const deleteResult = await Product.findOneAndDelete({ vendorId });
	return deleteResult;
}