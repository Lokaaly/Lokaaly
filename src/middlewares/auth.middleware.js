const jwt = require('jsonwebtoken');
const { MS } = require('../custom.errors');
const { User } = require('../models/model.user');
const config = require('../config/config');

const AuthMiddleware = (roleTypes) => {
	return async (req, res, next) => {
		let customErrorMessage = '';
		try {
			const authToken = req.headers['authorization'];
			if (!authToken) {
				customErrorMessage = MS.AUTH.TOKEN_MISSING;
				throw new Error(customErrorMessage);
			}
			const bearerToken = authToken.split(' ')[1];
			const userDetails = jwt.verify(bearerToken, config.JWT_SECRET_KEY);
			const user = await User.findById(userDetails._id);
			if (!user) throw new Error(MS.AUTH.USER_NOT_FOUND);
			if (!roleTypes || !roleTypes.includes(user.role)) throw new Error(MS.AUTH.ACCESS_DENIED);
			req.user = user;
			next();
		} catch (error) {
			console.log('Auth failed', error.message);
			res.status(401).send({ error: { message: customErrorMessage || MS.AUTH.FAILED } });
		}
	}
};

module.exports = {
	AuthMiddleware
};