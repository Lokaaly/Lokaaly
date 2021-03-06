const { uploadToS3Bucket } = require('./s3_lib');
const { ROLES } = require('../models/static.data');

const uploadFileInS3 = async (userId, userType, fileName, fileExt, fileBuffer) => {
	const fileFullName = `${fileName}${Date.now()}.${fileExt}`;
	const albumName = userType === ROLES.CUSTOMER ? 'customers' : `${userType}_${userId.toString()}`;

	const data = await uploadToS3Bucket({ albumName, file: { name: `${fileFullName}`, data: fileBuffer } });
	return data.Location;
};

module.exports = {
  uploadFileInS3,
};