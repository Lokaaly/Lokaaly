const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR  = 10;
const config = require('../config/config');
const { generateRandomCode } = require('../helpers/randomDigits');
const { MS } = require('../custom.errors');
const { MailSenderManager } = require('../helpers/sendGrid');

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
	photos: [new Schema({
		url: String
	})],
	licence: String,
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
		type: String,
	},
	passwordResetCode: {
		type: String,
	},
	shippingAddresses: [new Schema({
		city: String,
		state: String,
		address1: String,
		address2: String,
		zip: String,
		isPrimary: Boolean
	})],
	paymentMethods: [{
		last4: String,
		cardBrand: String,
		isPrimary: Boolean
	}],
	role: {
		type: String,
		enum: Object.values(ROLES),
		default: ROLES.CUSTOMER,
	},
	authType: {
		type: String,
		enum: Object.values(AUTH_TYPES),
	},
	authId: {
		type: String,
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
		if (user.authType === AUTH_TYPES.LOCAL && !user.password) throw new Error(MS.AUTH.PASS_MISSING);
		const exEmail = await User.findOne({ email: user.email }).lean();
		if (exEmail) throw new Error(MS.LOGIN.EMAIL_EXISTS);
		
		if (user.authType === AUTH_TYPES.LOCAL) {
			const hashedPassword = user.hashPassword();
			user.password = hashedPassword;
			user.verificationCode = generateRandomCode(6);
			user.status = USER_STATUSES.NOT_VERIFIED;

			await MailSenderManager.sendSignUpConfirmationCode(user.email, user.verificationCode);
		} else {
			user.status = USER_STATUSES.VERIFIED;
		}
	} else if (user.role === ROLES.VENDOR) {
		if (user.isNew) {
			user.status = USER_STATUSES.NOT_VERIFIED;
			user.authType = AUTH_TYPES.LOCAL;
		}
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

UserSchema.methods.userInfoResponse = function () {
	let user = this;
	const jwtToken = user.generateJwtToken();
	const response = user.toJSON();
	delete response.password;
	delete response.verificationCode;
	delete response.passwordResetCode;
	return { jwtToken, ...response };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
	User,
	USER_STATUSES,
	ROLES,
	AUTH_TYPES,
};