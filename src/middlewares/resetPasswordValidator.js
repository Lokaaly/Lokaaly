const jwt = require('jsonwebtoken');
const { MS } = require('../custom.errors');
const { User } = require('../models/model.user');

function ResetPasswordMiddleware() {
  return async (req, res, next) => {
    try {
			debugger;
      const { resetToken } = req.body;;
      if (!resetToken) throw new Error('Reset token is missing');
      console.log('Reset token', resetToken);
      const userDetails = jwt.verify(resetToken, process.env.JWT_SECRET_KEY);
      const user = await User.findById(userDetails._id);
      if (!user || !userDetails.passwordResetCode) throw new Error(MS.FORGET_PASS.INVALID_REQUEST);
      req.user = user;
      next();
    } catch (error) {
      console.log('Error occured in reset password middleware', error.message);
      res.status(401).send({ error: error.message });
    }
  }
}

module.exports = {
  ResetPasswordMiddleware
};
