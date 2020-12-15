const { MS } = require("../custom.errors");
const { User, ROLES, VENDOR_STATUSES } = require("../models/model.user");
const { Category } = require('../models/model.category');

exports.login = async (data) => {
	const user =	await User.findOne({ email: data.login });
	if (!user) throw new Error(MS.LOGIN.EMAIL);
	const matchedPass = user.comparePassword(data.password);
	if (!matchedPass) throw new Error(MS.LOGIN.PASSWORD);

	if (user.type !== ROLES.ADMIN) throw new Error(MS.AUTH.ACCESS_DENIED);
	const token = user.generateJwtToken();
	return { token, type: user.type };
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

	const result = await User.findByIdAndUpdate(vendorId, { 'vendor.status': VENDOR_STATUSES.ACTIVATED });
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
