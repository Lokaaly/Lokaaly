const { MS } = require('../custom.errors');
const { User, Admin } = require('../models/model.user');
const { ROLES, USER_STATUSES, VENDOR_REQ_STEPS } = require('../models/static.data');
const { Category } = require('../models/model.category');

exports.login = async (data) => {
	let admin =	await Admin.findOne({ email: data.email });
	if (!admin) throw new Error(MS.ADMIN.INVALID_CREDS);
	const matchedPass = admin.comparePassword(data.password);
	if (!matchedPass) throw new Error(MS.ADMIN.INVALID_CREDS);

	if (admin.role !== ROLES.ADMIN) throw new Error(MS.AUTH.ACCESS_DENIED);
	const token = admin.generateJwtToken();
	admin = admin.toJSON();
	delete admin.password;
	return { jwtToken: token, ...admin };
};

exports.getVendors = async (filter) => {
	const { skip = 0, limit = 20, activeStep } = filter || {};
	const query = { role: ROLES.VENDOR };
	if (activeStep) query["vendor.activeStep"] = +activeStep;
	const vendors = await User.find(query).skip(+skip).limit(+limit).lean();
	return vendors;
};

exports.getVendorById = async (vendorId) => {
	const vendor = await User.findById(vendorId).lean();
	if (!vendor || vendor.role !== ROLES.VENDOR) throw new Error(MS.VENDOR.INVALID);
	return vendor;
};

exports.submitVendorRequest = async (vendorId) => {
	const vendor = await User.findById(vendorId).lean();
	if (!vendor || vendor.role !== ROLES.VENDOR) throw new Error(MS.VENDOR.INVALID);

	if (vendor.vendor.activeStep !== VENDOR_REQ_STEPS.REQUESTED) throw new Error(MS.ADMIN.VENDOR_ALREADY_SUB);
	const result = await User.findOneAndUpdate({ _id: vendorId, role: ROLES.VENDOR }, { 'status': USER_STATUSES.VERIFIED, 'vendor.activeStep': VENDOR_REQ_STEPS.SUBMITTED }, { new: true}).lean();
	delete result.password;
	return result;
};

exports.addCategory = async (data, image) => {
	const category = new Category(data);
	const url = await category.uploadCategoryImage(image);
	category.image = url;
	return await category.save();
};

exports.updateCategory = async (id, data) => {
	const updateResult = await Category.findOneAndUpdate({_id: id }, data, { new: true }).lean();
	return updateResult;
};

exports.deleteCategory = async (id) => {
	const exCategory = await Category.findById(id);
	if (!exCategory) throw new Error('Invalid category');
	return await exCategory.remove();
}