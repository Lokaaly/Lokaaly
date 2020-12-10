const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR  = 10;
const config = require('../config/config');
const { generateRandomCode } = require('../helpers/randomDigits');

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

const VENDOR_STATUSES = {
	IN_PROGRESS: 0,
	ACTIVATED: 1
};

const validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};
// ----------------->> VENDOR SCHEMA <<----------------------------------
const VendorSchema = new Schema({
	businessName: String,
	businessType: String,
	description: String,
	socialMedia: String,
	webSite: String,
	photos: [new Schema({
		url: String
	})],
	licence: String,
	status: {
		type: Number,
		enum: [Object.values(VENDOR_STATUSES)],
	},
	raiting: {
		type: Number,
		default: 0
	}
});

// ----------------->> USER SCHEMA <<----------------------------------
const UserSchema = new Schema({
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
	password: String,
	location: {
		latitude: String,
		longitude: String,
	},
	verificationCode: {
		type: Number,
		default: 123456
	},
	role: {
		type: String,
		enum: Object.values(ROLES),
		default: ROLES.CUSTOMER,
	},
	authType: {
		type: String,
		enum: Object.values(AUTH_TYPES),
	},
	status: {
		type: String,
		enum: Object.values(USER_STATUSES),
	},
	avatar: String,
	country: String,
	city: String,
	
	favourites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	vendor: VendorSchema,
}, {
	versionKey: false,
	timestamps: true,
});

// ------------> HOOKS <---------------
UserSchema.pre('save', async function () {
	let user = this;

	if (user.isNew && user.role === ROLES.CUSTOMER) {
		const hashedPassword = user.hashPassword();
		user.password = hashedPassword;
		user.verificationCode = 123456 || generateRandomCode(6); // DEV
		user.authType = AUTH_TYPES.LOCAL;
		user.status = user.authType === AUTH_TYPES.LOCAL ? USER_STATUSES.NOT_VERIFIED : USER_STATUSES.VERIFIED;
		if (user.role === ROLES.VENDOR) user.vendor.status = VENDOR_STATUSES.IN_PROGRESS;
	} else if (user.isNew && user.role === ROLES.VENDOR) {
		// TO DO
		console.log('Vendor creation');
	}
});

// --------------------------> METHODS <------------------------------
UserSchema.methods.comparePassword = function (candidatePassword) {
	const isMatch = bcrypt.compareSync(candidatePassword, this.password);
	return isMatch;
};

UserSchema.methods.hashPassword = function () {
	let user = this;
	const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
	const hashedPass = bcrypt.hashSync(user.password, salt);
	return hashedPass;
};

UserSchema.methods.generateJwtToken = function () {
	let user = this;
	const token = jwt.sign({ _id: user._id, email: user.email, role: user.role, authType: user.authType }, config.JWT_SECRET_KEY, { expiresIn: '2h' });
	return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = {
	User,
	USER_STATUSES,
	ROLES,
	VENDOR_STATUSES,
};