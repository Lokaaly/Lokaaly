const { User, USER_STATUSES, ROLES } = require('../models/model.user');
const { MS } = require('../custom.errors');

exports.sendRequestForVendorRegistration = async (vendorRequest) => {
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

exports.getVendors = async (filter) => {
	const { skip = 0, limit = 10 } = filter || {};
	const query = { role: ROLES.VENDOR, status: USER_STATUSES.VERIFIED };
	const vendorsList = await User.find(query).sort({ 'vendor.businessName': 'asc'}).skip(skip).limit(limit).lean();
	return vendorsList;
};

exports.getVendorById = async (vendorId) => {
	const query = { role: ROLES.VENDOR, status: USER_STATUSES.VERIFIED };
	const vendor = await User.findOne({ _id: vendorId, ...query }).lean();
	return vendor;
};