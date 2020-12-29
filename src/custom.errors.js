const MS = {
	ADMIN: {
		INVALID_CREDS: 'Invalid admin credentials!',
		VENDOR_ALREADY_SUB: 'Vendor has been already submitted!'
	},
	LOGIN: {
		EMAIL_EXISTS: 'User with provided email already exists!',
		USER_NOT_EXIST: 'User with provided credentials doesnt exist!',
		PASSWORD_NOT_MATCHED: 'Password is not matched!',
		PASS_MISSING: 'Password is missing!',
		NOT_VERIFIED: 'Please, verify your account!',
	},
	CATEGORY: {
		IS_INVALID: 'Invalid category!'
	},
	AUTH: {
		TOKEN_MISSING: 'Authorization token is missing!',
		FAILED: 'Authorization failed!',
		ACCESS_DENIED: 'Access denied!',
		USER_NOT_FOUND: 'User not found!',
		INV_VER_CODE: 'Invalid verification code! Try again!',
		PASS_MISSING: 'Password is missing',
		VER_CODE_MISSING: 'Verification code is missing. Please, provide it!',
	},
	VENDOR: {
		INVALID: 'Invalid vendor!',
		LOGIN_ERR: 'Provided vendor doesn\'t exist or is not active!' 
	},
	FORGET_PASS: {
		INVALID_RESET_CODE: 'Password reset code is not valid!',
		INVALID_REQUEST: 'Invalid request for reseting password!',
	},
	SOCIAL_OAUTH: {
		FAILED: 'Failed to retrieve facebook data'
	},
	PRODUCT: {
		INVALID: 'Provided product id doesn\'t exist!'
	}
};

module.exports = {
	MS,
};