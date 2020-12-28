const { Category } = require('../models/model.category');

exports.getCategories = async () => {
	return await Category.find().lean();
};