const { Product, SORT_TYPES } = require('../models/model.product');
const { MS } = require('../custom.errors');
const { uploadFileInS3 } = require('../helpers/s3_uploader');
const { ROLES, VENDOR_REQ_STEPS } = require('../models/static.data');
const { User } = require('../models/model.user');
const escapeStringRegexp = require('escape-string-regexp');
const { deleteFileFromS3 } = require('../helpers/s3_lib');

exports.getProductsList = async (filter) => {
	const {
		search, skip = 0, limit = 10, vendorId, categoryId,
		prepRange, priceRange, sort
	} = filter || {};
	const query = { active: true };

	if (vendorId) {
		const exVendor = await User.findOne({ _id: vendorId, role: ROLES.VENDOR });
		if (!exVendor || exVendor.vendor.activeStep !== VENDOR_REQ_STEPS.ACTIVATED) throw new Error(MS.VENDOR.INVALID);
		query.vendorId = vendorId;
	}
	if (categoryId) query.categoryId = categoryId;
	if (priceRange) {
		const [minPrice, maxPrice] = priceRange.split('-');
		if (minPrice && minPrice >= 0 && maxPrice && maxPrice > minPrice) {
			query.price = { $gte: minPrice };
			query.price = { $lte: maxPrice };
		}
	}
	if (search) {
		const $regex = escapeStringRegexp(search);
		query.title = { $regex };
	}

	if (prepRange) {
		const [minPrep, maxPrep] = prepRange.split('-');
		if (minPrep && minPrep >= 0 && maxPrep && maxPrep > minPrep) {
			query.prepTime = { $gte: minPrep };
			query.prepTime = { $lte: maxPrep };
		}
	}
	let productsPromise = Product.find(query);

	if (sort && SORT_TYPES[sort]) {
		productsPromise.sort(SORT_TYPES[sort]);
	}
	const products = await productsPromise
		.skip(+skip)
		.limit(+limit)
		.lean();
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
	}));
	const product = new Product({ vendorId, ...data, images });
	const creatResult = await product.save();
	return creatResult;
};

exports.updateProduct = async (vendorId, reqBody, reqFiles) => {
	const { productId, $pullImages, $pushImages = reqFiles, ...data } = reqBody;

	const exProduct = await Product.findOne({ _id: productId, vendorId });
	if (!exProduct) throw new Error(MS.PRODUCT.INVALID);

	if ($pullImages) {
		const pullImageIds = $pullImages.split(',');
		const filteredImages = exProduct.images.filter(i => !pullImageIds.includes(i._id.toString()));
		exProduct.images = filteredImages.toObject();
		// Remove pulled images from S3
		for (let imgId of pullImageIds) {
			const imgFound = exProduct.images.find((i) => i._id.toString() === imgId);
			if (imgFound) {
				await deleteFileFromS3(imgFound.url);
			}
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
	if (data.addons) data.addons = JSON.parse(data.addons);
	Object.keys(data).forEach((k) => {
		debugger;
		exProduct[k] = data[k]
	});

	const updData = await exProduct.save();
	return updData;
};

exports.removeProduct = async (vendorId) => {
	const deleteResult = await Product.findOneAndDelete({ vendorId });
	return deleteResult;
};

exports.getFavourites = async (customerId) => {
	const result = await User.findById(customerId).populate('favourites').lean();
	return result.favourites;
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