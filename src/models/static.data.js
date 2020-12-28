const USER_STATUSES = {
	VERIFIED: 'verified',
	NOT_VERIFIED: 'not_verified'
};

const ROLES = {
	ADMIN: 'admin',
	VENDOR: 'vendor',
	PROVIDER: 'provider',
	CUSTOMER: 'customer',
};

const AUTH_TYPES = {
	LOCAL: 'local',
	FB: 'facebook',
	GOOGLE: 'google'
};

const VENDOR_REQ_STEPS = {
	REQUESTED: 0,
	SUBMITTED: 1,
	ACTIVATED: 2
};

module.exports = {
	USER_STATUSES,
	ROLES,
	AUTH_TYPES,
	VENDOR_REQ_STEPS,
};