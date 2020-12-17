const businessUser = require('./business.user');

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