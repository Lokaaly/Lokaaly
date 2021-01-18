const { MS } = require('../custom.errors');
const { deleteFileFromS3 } = require('../helpers/s3_lib');
const { uploadFileInS3 } = require('../helpers/s3_uploader');
const { Product } = require('../models/model.product');
const businessProduct = require('./business.product');

exports.getProducts = async (req, res) => {
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
	return await businessProduct.updateProduct(vendorId, req.body, req.files);
};

exports.removeProduct = async (req, res) => {
	const { _id: vendorId } = req.user;
	const { id: productId } = req.params;
	return await businessProduct.removeProduct(vendorId, productId);
};

exports.getFavouriteProductList = async (req, res) => {
	const user = req.user;
	return await businessProduct.getFavourites(user);
};

exports.setFavouriteProduct = async (req, res) => {
	const { id: productId } = req.params;
	return await businessProduct.setUnsetFavourite(req.user, productId);
};