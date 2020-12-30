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
		const splParts = file.originalname.split('.');d
		const fileExt = splParts[splParts.length - 1];
		const fileName = splParts[0];
		const url = await uploadFileInS3(vendorId, ROLES.VENDOR, fileName, fileExt, file.buffer);
		return { url };
	}))
	const product = new Product({ vendorId, ...data, images });
	const creatResult = await product.save();
	return creatResult;
};

exports.updateProduct = async (vendorId, reqBody, reqFiles) => {
	const { productId, $pullImages, $pushImages = req.files, ...data } = reqBody;

	const exProduct = await Product.findOne({ _id: productId, vendorId });
	if (!exProduct) throw new Error(MS.PRODUCT.INVALID);

	if ($pullImages) {
		const pullImageIds = $pullImages.split(',');
		const filteredImages = exProduct.images.filter(i => !pullImageIds.includes(i._id));
		exProduct.images = filteredImages;
		// Remove pulled images from S3
		for (let imgId of pullImageIds) {
			const imgFound = exProduct.images.find((i) => i._id === imgId);
			if (imgFound) await deleteFileFromS3(imgFound.url);
		}
	}
	if ($pushImages && reqFiles) {
		for ( let reqFile of reqFiles) {
			const splParts = reqFile.originalname.split('.');
			const fileExt = splParts[1];
			const fileName = splParts[0];

			const url = await uploadFileInS3(vendorId, 'vendor', fileName, fileExt, reqFile.buffer);
			exProduct.images.push({ url });
		}
	}
	Object.keys(data).forEach((k) => exProduct[k] = data[k]);

	const updData = await exProduct.save();
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