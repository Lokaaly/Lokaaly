const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR  = 10;
const config = require('../config/config');
const { ROLES, AUTH_TYPES } = require('./static.data');

const SALT = bcrypt.genSaltSync(SALT_WORK_FACTOR);

// ----------------->> ADMIN SCHEMA <<----------------------------------
const AdminSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: ROLES.ADMIN
	},
	authType: {
		type: String,
		default: AUTH_TYPES.LOCAL
	}
}, {
	versionKey: false,
	timestamps: true,
});

AdminSchema.pre('findOneAndUpdate', async function () {
	let update = this.getUpdate();
	if (update.password) {
		update.password = bcrypt.hashSync(update.password, SALT);
	}
});

// --------------------------> METHODS <------------------------------
AdminSchema.methods.comparePassword = function (candidatePassword) {
	const isMatch = bcrypt.compareSync(candidatePassword, this.password);
	return isMatch;
};

AdminSchema.methods.hashPassword = function (password) {
	const hashedPass = bcrypt.hashSync(password, SALT);
	return hashedPass;
};

AdminSchema.methods.generateJwtToken = function () {
	let admin = this;
	const token = jwt.sign({ _id: admin._id, email: admin.email, role: admin.role, authType: admin.authType }, config.JWT_SECRET_KEY, { expiresIn: '2h' });
	return token;
};

AdminSchema.methods.adminInfoResponse = function () {
	let admin = this;
	let response = null;
	if (admin) {
		const jwtToken = admin.generateJwtToken();
		const adminJsonData = admin.toJSON();
		delete adminJsonData.password;
		response = { jwtToken, ...adminJsonData };
	}
	return response;
};

module.exports = {
	AdminSchema,
};