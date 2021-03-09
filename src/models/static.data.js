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

const TRANSPORT_TYPE = {
	CAR: 1,
	MOTOR_CYCLE: 2,
	BYCYCLE: 3,
	SCOOTER: 4,
	FOOT: 5,
	TRUCK: 6, 
};

const FLEET_TYPES = {
	CAPATIVE: 'capative',
	FREELANCE: 'freelance',
};

module.exports = {
	USER_STATUSES,
	ROLES,
	AUTH_TYPES,
	VENDOR_REQ_STEPS,
	TRANSPORT_TYPE,
	FLEET_TYPES,
};