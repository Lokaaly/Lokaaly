const { Product } = require('../models/model.product');
const { MS } = require('../custom.errors');
const { uploadFileInS3 } = require('../helpers/s3_uploader');
const { ROLES } = require('../models/static.data');

exports.getProductsList = async (filter) => {
	const { skip = 0, limit = 10, vendorId } = filter || {};
	if (!vendorId) throw new Error(MS.VENDOR.INVALID);
	const products = await Product.find({ vendorId }).skip(+skip).limit(+limit).lean();
	return products;
};

exports.getProduct = async (id) => {
	const product = await Product.findById(id);
	return product;
};

exports.addProduct = async (vendorId, data) => {
	const images = await Promise.all(data.images.map(async (file) => {
		const splParts = file.originalname.split('.');
		const fileExt = splParts[splParts.length - 1];
		const fileName = splParts[0];
		const url = await uploadFileInS3(vendorId, ROLES.VENDOR, fileName, fileExt, file.buffer);
		return { url };
	}))
	const product = new Product({ vendorId, ...data, images });
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
};

exports.setUnsetFavourite = async (customer, productId) => {
	const exProduct = await Product.findById(productId);
	if (!exProduct) throw new Error(MS.PRODUCT.INVALID);

	let setFavourite = true;
	
	let favIndex = customer.favourites.indexOf(productId);
	if (favIndex === -1) customer.favourites.push(productId);
	else {
		customer.favourites.splice(favIndex, 1);
		setFavourite = false;
	}

	const response = await customer.save();
	return { favourites: response.favourites, isSetFavourite: setFavourite };
};