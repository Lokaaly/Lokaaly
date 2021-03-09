const { uploadFileInS3 } = require('../helpers/s3_uploader');
const { Driver } = require('../models/model.driver');
const _ = require('lodash');

exports.sendRequestForAgentRegistration = async (driverRequest) => {
	let { drivingLicense, passport } = driverRequest;

	if (!drivingLicense || !passport) throw new Error('Driver license or passport is missing!');
	{
		const splParts = drivingLicense[0].originalname.split('.');
		const fileExt = splParts[1];
		const fileName = splParts[0];
		const url = await uploadFileInS3('tookan', 'driver', fileName, fileExt, drivingLicense[0].buffer);
		driverRequest.drivingLicense = url;
	}
  {
		const splParts = passport[0].originalname.split('.');
		const fileExt = splParts[1];
		const fileName = splParts[0];
		const url = await uploadFileInS3('tookan', 'driver', fileName, fileExt, passport[0].buffer);
		driverRequest.passport = url;
  }

	const driver = new Driver({...driverRequest });
	const result = (await driver.save()).toJSON();
	return result;
};

exports.getTookanDrivers = async (filter) => {
	const { skip = 0, limit = 10 } = filter || {};
	const driversList = await Driver.find().skip(+skip).limit(+limit).lean();
	return driversList;
};

exports.getTookanDriverById = async (driverId) => {
	return await Driver.findById(driverId).lean();
};

exports.updateAgentById = async (agentId, data) => {
	let body = _.pick(data, ['status']);
	return await Driver.findOneAndUpdate({ _id: agentId }, { ...body }, { new: true }).lean();
};