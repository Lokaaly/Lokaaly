const { User } = require('../models/model.user');
const { USER_STATUSES, ROLES, AUTH_TYPES } = require('../models/static.data');
const { MS } = require('../custom.errors');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch').default;
const { OAuth2Client } = require('google-auth-library');
const { generateRandomCode } = require('../helpers/randomDigits');
const { MailSenderManager } = require('../helpers/sendGrid');

const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

exports.createUser = async (data) => {
	let user = new User({ ...data, authType: AUTH_TYPES.LOCAL });
	user = await user.save();
	return user.userInfoResponse();
};

exports.verifyAccount = async (userId, verificationCode) => {
	if (!verificationCode) throw new Error(MS.AUTH.VER_CODE_MISSING);
	const user = await User.findById(userId);
	if (!user || user.verificationCode !== verificationCode) throw new Error(MS.AUTH.INV_VER_CODE);
	const updUser = await User.findByIdAndUpdate(userId, { status: USER_STATUSES.VERIFIED, verificationCode: null }, { new: true });
	return updUser.userInfoResponse();
};

exports.login = async (data) => {
	const user =	await User.findOne({ email: data.login });
	if (!user) throw new Error(MS.LOGIN.USER_NOT_EXIST);
	const matchedPass = user.comparePassword(data.password);
	if (!matchedPass) throw new Error(MS.LOGIN.PASSWORD_NOT_MATCHED);
	return user.userInfoResponse();
};

exports.getProfile = async (userId) => {
	const user = await User.findById(userId);
	return user.userInfoResponse();
};

exports.updateProfile = async (userId, data) => {
	const retVal = await User.findOneAndUpdate({ _id: userId }, data, { new: true});
	if (retVal) {
		delete retVal.password;
		delete retVal.verificationCode;
		delete retVal.passwordResetCode;
	}
	return retVal;
};

// CUSTOMER SHIPPING ADDRESSES
exports.addShippingAddress = async (user, data) => {
	user.shippingAddresses.push(data);
	const updatedDoc = await user.save();
	return updatedDoc;
};

exports.updateShippingAddress = async (user, updateData) => {
	if (!updateData._id) throw new Error('Shipping address is not provided');
	user.shippingAddresses.forEach((address, i) => {
		if (address._id.toString() === updateData._id) {
			const updatedAddress = { ...address.toJSON(), ...updateData };
			user.shippingAddresses[i] = updatedAddress;
		}
	});
	return await user.save();
};

exports.removeShippingAddress = async (userId, addressId) => {
	return await User.findOneAndUpdate({ _id: userId }, { $pull: { shippingAddresses: { _id: addressId } } }, { new: true });
};

exports.facebookSignIn = async (data) => {
	const { userId, accessToken } = data;
	const fbUserInfoGraphURL = `https://graph.facebook.com/${userId}?fields=id,first_name,last_name,email&access_token=${accessToken}`;
	const userInfoPromise = await fetch(fbUserInfoGraphURL, {
		method: 'GET'
	});
	const fbResult = await userInfoPromise.json();
	if (!fbResult || fbResult.error) throw new Error(MS.SOCIAL_OAUTH.FAILED);

	const { id, first_name, last_name, email } = fbResult;
	let user = await User.findOne({ email });
	// Create a new user if not exists
	if (!user) {
		console.log('Creating a new FB user');
		user = new User({
			firstName: first_name,
			lastName: last_name,
			email,
			role: ROLES.CUSTOMER,
			authId: id,
			authType: AUTH_TYPES.FB,
		});
		user = await user.save();
	}
	return user.userInfoResponse();
};

exports.googleSignIn = async (tokenId) => {
	const loginTicket = await googleClient.verifyIdToken({
		idToken: tokenId,
	});
	const { sub, email, family_name, given_name } = loginTicket.getPayload();

	let user = await User.findOne({ email } );
	// Create a new user if not exists
	if (!user) {
		console.log('Creating a new Google user');
		user = new User({
			firstName: family_name,
			lastName: given_name,
			email,
			role: ROLES.CUSTOMER,
			authId: sub,
			authType: AUTH_TYPES.GOOGLE,
		});
		user = await user.save();
	}
	return user.userInfoResponse();
};

exports.sendForgetPassword = async (email) => {
	const randomCode = generateRandomCode(6);
	let exUser = await User.findOne({ email, authType: AUTH_TYPES.LOCAL });
	if (!exUser) throw new Error(MS.AUTH.USER_NOT_FOUND);

	await MailSenderManager.sendResetPasswordCode(email, randomCode);
	exUser.passwordResetCode = randomCode;
	exUser = await exUser.save();

	return exUser.userInfoResponse();
};

exports.validatePasswordResetCode = async (email, code) => {
	let foundUser =  await User.findOne({ email, passwordResetCode: code });
	if (!foundUser) throw new Error(MS.FORGET_PASS.INVALID_RESET_CODE);

	return {
		resetToken: jwt.sign({ _id: foundUser._id, passwordResetCode: foundUser.passwordResetCode, resetPassword: true }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
	};
};

exports.changeForgottenPassword = async (user, newPassword) => {
	user.password = newPassword;
	const newHashedPassword = user.hashPassword();
	user.password = newHashedPassword;
	const updUser = await user.save();
	return updUser.userInfoResponse();
};

exports.testFunc = async (req) => {
	// const { MailSenderManager } = require('../helpers/sendGrid');
	// const result = await MailSenderManager.confirmationCode('lokaalytest@yopmail.com', '659');
	// debugger;
	return 0;
};