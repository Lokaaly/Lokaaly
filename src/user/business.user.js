const { User, USER_STATUSES } = require('../models/model.user');
const { MS } = require('../custom.errors');

exports.createUser = async (data) => {
	const user = new User(data);
	const createdUser = await user.save();
	const jwtToken = createdUser.generateJwtToken();

	let userData = createdUser.toJSON();
	delete userData.password;
	delete userData.verificationCode;
	return {
		...userData,
		jwtToken
	};
};

exports.verifyAccount = async (userId, verificationCode) => {
	if (!verificationCode) throw new Error(MS.AUTH.VER_CODE_MISSING);
	const user = await User.findById(userId);
	if (!user || user.verificationCode !== Number(verificationCode)) throw new Error(MS.AUTH.INV_VER_CODE);
	const userInfo = await User.findByIdAndUpdate(userId, { status: USER_STATUSES.VERIFIED, verificationCode: null }).lean();
	delete userInfo.password;
	return userInfo;
};

exports.login = async (data) => {
	const user =	await User.findOne({ email: data.login });
	if (!user) throw new Error(MS.LOGIN.USER_NOT_EXIST);
	const matchedPass = user.comparePassword(data.password);
	if (!matchedPass) throw new Error(MS.LOGIN.PASSWORD_NOT_MATCHED);

	const token = user.generateJwtToken();
	const response = user.loginResponse();
	return { token, ...response };
};