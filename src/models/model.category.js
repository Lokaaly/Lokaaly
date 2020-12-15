const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ----------------->> Category SCHEMA <<----------------------------------
const CategorySchema = new Schema({
	name: {
		type: String,
		uppercase: true,
		unique: true,
		required: true,
	},
	image: String,
}, {
	versionKey: false,
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
	Category,
};