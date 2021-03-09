const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MailSenderManager } = require('../helpers/sendGrid');
const { FLEET_TYPES, USER_STATUSES, TRANSPORT_TYPE } = require('./static.data');

const validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

// ----------------->> DRIVER SCHEMA <<----------------------------------
const DriverSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		validate: [validateEmail, 'Please fill a valid email address'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	phoneNumber: String,
	carModel: String,
	plateNumber: String,
	drivingLicense: String,
	passport: String,
	fleetType: {
		type: String,
		enum: Object.values(FLEET_TYPES),
	},
	transportType: {
		type: Number,
		enum: Object.values(TRANSPORT_TYPE),
	},
	status: {
		type: String,
		enum: Object.values(USER_STATUSES),
	}
}, {
	versionKey: false,
	timestamps: true,
});

// ------------> HOOKS <---------------
DriverSchema.pre('save', async function () {
	debugger;
	let driver = this;
	if (driver.isNew) {
		const exEmail = await Driver.findOne({ email: driver.email }).lean();
		if (exEmail) throw new Error('Email already exists');
		driver.status = USER_STATUSES.NOT_VERIFIED;
		debugger;
		}
});

const Driver = mongoose.model('Driver', DriverSchema, 'drivers');

module.exports = {
	Driver,
};