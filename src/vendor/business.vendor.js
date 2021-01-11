const { User } = require('../models/model.user');
const { USER_STATUSES, ROLES} = require('../models/static.data');
const { MS } = require('../custom.errors');
const { deleteFileFromS3 } = require('../helpers/s3_lib');
const { uploadFileInS3 } = require('../helpers/s3_uploader');

exports.sendRequestForVendorRegistration = async (vendorRequest) => {
	const { license } = vendorRequest.vendor;
	const splParts = license.originalname.split('.');
	const fileExt = splParts[1];
	const fileName = splParts[0];

	const url = await uploadFileInS3('licenses', 'vendor', fileName, fileExt, license.buffer);
	vendorRequest.vendor.license = url;

	const vendor = new User({...vendorRequest, role: ROLES.VENDOR });
	const result = (await vendor.save()).toJSON();
	return result;
};

exports.vendorLogin = async (data) => {
	const vendor = await User.findOne({
		email: data.email
	});
	if (!vendor || vendor.role !== ROLES.VENDOR || vendor.status !== USER_STATUSES.VERIFIED) throw new Error(MS.VENDOR.LOGIN_ERR);

	const matchedPass = vendor.comparePassword(data.password);
	if (!matchedPass) throw new Error(MS.LOGIN.PASSWORD_NOT_MATCHED);

	const jwtToken = vendor.generateJwtToken();
	const response = vendor.toJSON();
	delete response.password;
	delete response.verificationCode;
	return { jwtToken, ...response };
};

exports.updateVendorPassword = async (user, password) => {
	user.password = password;
	let retVal = await user.save();
	return retVal.userInfoResponse();
};

exports.getVendors = async (filter) => {
	const { skip = 0, limit = 10 } = filter || {};
	const query = { role: ROLES.VENDOR, status: USER_STATUSES.VERIFIED };
	const vendorsList = await User.find(query).skip(+skip).limit(+limit).lean();
	return vendorsList;
};

exports.getVendorById = async (vendorId) => {
	const query = { role: ROLES.VENDOR, status: USER_STATUSES.VERIFIED };
	const vendor = await User.findOne({ _id: vendorId, ...query }).lean();
	return vendor;
};

exports.updateVendor = async (currentVendor, body, files) => {
	const { $pushImages, profileImage, license } = files;
	const { $pullImages } = body;

	if (body.backgroundImage) {
		const validBackImage = currentVendor.vendor.photos.find((p) => p._id.toString() === body.backgroundImage);
		if (!validBackImage) throw new Error('Invalid background image');
		body.backgroundImage = validBackImage.url;
	}

	if ($pullImages) {
		const pullImageIds = $pullImages.split(',');
		for (let imgId of pullImageIds) {
			let photoIndex = null;
			const imgFound = currentVendor.vendor.photos.find((val, ind) => {
				photoIndex = ind;
				return val._id.toString() === imgId});
			if (imgFound) {
				await deleteFileFromS3(imgFound.url);
				currentVendor.vendor.photos = currentVendor.vendor.photos.slice(photoIndex, 1);
			}
		}
	}
	if ($pushImages) {
		for ( let reqFile of $pushImages) {
			const splParts = reqFile.originalname.split('.');
			const fileExt = splParts[1];
			const fileName = splParts[0];

			const url = await uploadFileInS3(currentVendor._id, 'vendor', fileName, fileExt, reqFile.buffer);
			currentVendor.vendor.photos.push({ url });
		}
	}
	if (profileImage) {
		if (currentVendor.vendor.profileImage) await deleteFileFromS3(currentVendor.vendor.profileImage);
		const profileImgRegFile = profileImage[0];
		const splParts = profileImgRegFile.originalname.split('.');
		const fileExt = splParts[1];
		const fileName = splParts[0];

		const url = await uploadFileInS3(currentVendor._id, 'vendor', fileName, fileExt, profileImgRegFile.buffer);
		currentVendor.vendor.profileImage = url;
	}

	if (license) {
		const licenseReqFile = license[0];
		const splParts = licenseReqFile.originalname.split('.');
		const fileExt = splParts[1];
		const fileName = splParts[0];
		if (['pdf'].includes(fileExt)) {
			if (currentVendor.vendor.license) await deleteFileFromS3(currentVendor.vendor.license);
			const url = await uploadFileInS3(currentVendor._id, 'vendor', fileName, fileExt, licenseReqFile.buffer);
			currentVendor.vendor.license = url;
		}
	}

	Object.keys(body).forEach((k) => {
		if (!['$pullImages'].includes(k)) {
			currentVendor.vendor[k] = body[k];
		}
	});

	const updData = await currentVendor.save();
	delete updData.password;
	return updData;
};