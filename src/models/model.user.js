const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { generateRandomCode } = require('../helpers/randomDigits');
const { MS } = require('../custom.errors');
const { MailSenderManager } = require('../helpers/sendGrid');
const { uploadFileInS3  } = require('../helpers/s3_uploader');
const { deleteFileFromS3 } = require('../helpers/s3_lib');
const { ROLES, AUTH_TYPES, USER_STATUSES, VENDOR_REQ_STEPS } = require('./static.data');
const { AdminSchema } = require('./model.admin');
const generator = require('generate-password');

const SALT_WORK_FACTOR  = 10;
const SALT = bcrypt.genSaltSync(SALT_WORK_FACTOR);

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
	profileImage: String,
	backgroundImage: String,
	photos: [new Schema({
		url: String
	})],
	license: String,
	raiting: {
		type: Number,
		default: 0
	},
	activeStep: {
		type: Number,
		enum: Object.values(VENDOR_REQ_STEPS),
		default: VENDOR_REQ_STEPS.REQUESTED,
	}
});

const shippingAddressSchema = new Schema({
	firstName: String,
	lastName: String,
	city: String,
	state: String,
	address1: String,
	address2: String,
	zip: String,
	phoneNumber: String,
	isPrimary: {
		type: Boolean,
		default: true,
	}
});

const paymentMethodSchema = new Schema({
	last4: String,
	cardBrand: String,
	isPrimary: { type: Boolean, default: true}
});

// ----------------->> USER SCHEMA <<----------------------------------
const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: String,
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
	shippingAddresses: [shippingAddressSchema],
	paymentMethods: [paymentMethodSchema],
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
	} else if (user.role === ROLES.VENDOR) { // # VENDOR
		if (user.isNew) {
			user.status = USER_STATUSES.NOT_VERIFIED;
			user.authType = AUTH_TYPES.LOCAL;
		} else if (user.isModified('password')) {
			user.password = bcrypt.hashSync(user.password, SALT);
			if (user.vendor.activeStep === VENDOR_REQ_STEPS.SUBMITTED) user.vendor.activeStep = VENDOR_REQ_STEPS.ACTIVATED;
		}
	}
});

UserSchema.pre('findOneAndUpdate', async function () {
	let update = this.getUpdate();
	let query = this.getQuery();
	if (update && update.avatar) {
		const fileFullName = update.avatar.originalname.split('.');
		const exUser = await this.findOne({ _id: query._id}).lean();
		if (exUser.avatar) {
			await deleteFileFromS3(exUser.avatar);
		}
		const url = await uploadFileInS3(query._id, exUser.role, fileFullName[0], fileFullName[1], update.avatar.buffer);
		update.avatar = url; 
	}
	if (update['vendor.activeStep'] === VENDOR_REQ_STEPS.SUBMITTED) {
		const tempGenPass = generator.generate({ length: 8, numbers: true, excludeSimilarCharacters: true });
		const hashedTempPass = bcrypt.hashSync(tempGenPass, SALT);
		update.password = hashedTempPass;

		const exVendor = await this.findOne(query).lean();
		await MailSenderManager.sendSubmitionForVendor(exVendor.email, tempGenPass);
	}
});

// --------------------------> METHODS <------------------------------
UserSchema.methods.comparePassword = function (candidatePassword) {
	const isMatch = bcrypt.compareSync(candidatePassword, this.password);
	return isMatch;
};

UserSchema.methods.hashPassword = function () {
	let user = this;
	const hashedPass = bcrypt.hashSync(user.password, SALT);
	return hashedPass;
};

UserSchema.methods.generateJwtToken = function () {
	let user = this;
	const token = jwt.sign({ _id: user._id, email: user.email, role: user.role, authType: user.authType }, config.JWT_SECRET_KEY, { expiresIn: '2h' });
	return token;
};

UserSchema.methods.userInfoResponse = function () {
	let user = this;
	let response = null;
	if (user) {
		const jwtToken = user.generateJwtToken();
		const userJsonData = user.toJSON();
		delete userJsonData.password;
		delete userJsonData.verificationCode;
		delete userJsonData.passwordResetCode;
		response = { jwtToken, ...userJsonData };
	}
	return response;
};

const User = mongoose.model('User', UserSchema, 'users');
const Admin = mongoose.model('Admin', AdminSchema, 'users');

module.exports = {
	User,
	Admin,
};