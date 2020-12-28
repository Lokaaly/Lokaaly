const mongoose = require('mongoose');
const { deleteFileFromS3 } = require('../helpers/s3_lib');
const { uploadFileInS3 } = require('../helpers/s3_uploader');
const { ROLES } = require('./static.data');
const Schema = mongoose.Schema;

// ----------------->> Category SCHEMA <<----------------------------------
const CategorySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	image: String,
}, {
	versionKey: false,
});

CategorySchema.methods.uploadCategoryImage = async function (image) {
	const splParts = image.originalname.split('.');
	const fileExt = splParts[splParts.length - 1];
	const fileName = splParts[0];
	const url = await uploadFileInS3('categories', ROLES.ADMIN, fileName, fileExt, image.buffer);
	return url;
};

CategorySchema.pre('findOneAndUpdate', async function () {
	let update = this.getUpdate();
	let query = this.getQuery();
	if (query._id && update && update.image) {
		const exCategory = await this.findOne({ _id: query._id}).lean();
		if (exCategory.image) {
			await deleteFileFromS3(exCategory.image);
		}
		const splParts = update.image.originalname.split('.');
		const fileExt = splParts[splParts.length - 1];
		const fileName = splParts[0];
		update.image = await uploadFileInS3('categories', ROLES.ADMIN, fileName, fileExt, update.image.buffer);
	}
});

CategorySchema.pre('remove', async function() {
	await deleteFileFromS3(this.image);
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
	Category,
};