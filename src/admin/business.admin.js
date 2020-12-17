const { MS } = require("../custom.errors");
const { User, ROLES, USER_STATUSES } = require("../models/model.user");
const { Category } = require('../models/model.category');
const generator = require('generate-password');

exports.login = async (data) => {
	let user =	await User.findOne({ email: data.login });
	if (!user) throw new Error(MS.LOGIN.USER_NOT_EXIST);
	const matchedPass = user.comparePassword(data.password);
	if (!matchedPass) throw new Error(MS.LOGIN.PASSWORD_NOT_MATCHED);

	if (user.role !== ROLES.ADMIN) throw new Error(MS.AUTH.ACCESS_DENIED);
	const token = user.generateJwtToken();
	user = user.toJSON();
	delete user.password;
	return { jwtToken: token, ...user };
};

exports.getVendors = async (filter) => {
	const { skip = 0, limit = 20 } = filter || {};
	const vendors = await User.find({ role: ROLES.VENDOR }).skip(skip).limit(limit).lean();
	return vendors;
};

exports.getVendorById = async (vendorId) => {
	const vendor = await User.findById(vendorId).lean();
	if (!vendor || vendor.role !== ROLES.VENDOR) throw new Error(MS.VENDOR.INVALID);
	return vendor;
};

exports.activateVendor = async (vendorId) => {
	const vendor = await User.findById(vendorId).lean();
	if (!vendor || vendor.role !== ROLES.VENDOR) throw new Error(MS.VENDOR.INVALID);
	const genTempPass = generator.generate({ numbers: true, length: 6 });
	const result = await User.findOneAndUpdate({ _id: vendorId, role: ROLES.VENDOR }, { 'status': USER_STATUSES.VERIFIED, password: 123456 || genTempPass });
	return result;
};

exports.addCategory = async (data) => {
	const category = new Category(data);
	const result = await category.save();
	return result;
};

exports.updateCategory = async (id, data) => {
	const updateResult = await Category.findByIdAndUpdate(id, data).lean();
	return updateResult;
};
