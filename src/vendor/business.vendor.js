const { User, USER_STATUSES, VENDOR_STATUSES } = require('../models/model.user');
const { MS } = require('../custom.errors');

exports.getVendors = async (filter) => {
	const { skip = 0, limit = 10 } = filter || {};
	const query = { 'vendors.status': VENDOR_STATUSES.ACTIVATED };
	const vendorsList = await User.find(query).sort({ 'vendor.name': 'asc'}).skip(skip).limit(limit).lean();
	return vendorsList;
};

exports.getVendorById = async (vendorId) => {
	const query = { 'vendors.status': VENDOR_STATUSES.ACTIVATED };
	const vendor = await User.findOne({ _id: vendorId, query }).lean();
	return vendor;
};