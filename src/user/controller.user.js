const businessUser = require('./business.user');

// ------------------- ACCOUNT --------------------------
exports.userSignUp = async (req, res) => {
	return await businessUser.createUser(req.body);
};

exports.activateAccount = async (req, res) => {
	return await businessUser.verifyAccount(req.user._id, req.query.code);
}

exports.userLogin = async (req, res) => {
	return await businessUser.login(req.body);
};

exports.getProfile = async (req, res) => {
	return await businessUser.getProfile(req.user._id);
};

exports.updateProfile = async (req, res) => {
	debugger;
	return await businessUser.updateProfile();
};

// ------------------- RESET PASSWORD --------------------
exports.forgetPassword = async (req, res) => {
	const { email } = req.query;
	return await businessUser.sendForgetPassword(email);
};

exports.validatePasswordResetCode = async (req, res) => {
	const { email, code } = req.body;
	return await businessUser.validatePasswordResetCode(email, code);
};

exports.changeForgottenPassword = async (req, res) => {
	const user = req.user;
	const { newPassword } = req.body;
	return await businessUser.changeForgottenPassword(user, newPassword);
};

// -------------- SOCIAL MEDIA OAUTH  ---------------------
exports.facebookAuth = async (req, res) => {
	return await businessUser.facebookSignIn(req.body);
};

exports.googleAuth = async (req, res) => {
	const { idToken } = req.body;
	return await businessUser.googleSignIn(idToken);
};

exports.testFunc = async (req, res) => {
	return await businessUser.testFunc(req);
};