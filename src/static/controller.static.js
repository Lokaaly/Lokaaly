const businessStatic = require('./business.static');

exports.getCategories = async (req, res) => {
	return await businessStatic.getCategories();
};
