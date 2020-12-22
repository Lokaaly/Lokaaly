const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/config');
const { MS } = require('../custom.errors');
const { Category } = require('./model.category');


const SELECT_TYPES = {
	SINGLE: 'single',
	MULTI: 'multi',
	CHECKBOX: 'checkbox'
};

// ----------------->> Product SCHEMA <<----------------------------------
const ProductSchema = new Schema({
	vendorId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'category',
		required: true,
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		default: 'USD'
	},
	active: {
		type: Boolean,
		default: true
	},
	specifications: [new Schema({
		title: String,
		selectType: { type: String, enum: Object.values(SELECT_TYPES) },
		list: [new Schema({
			value: { type: String, required: true },
			price: {
				type: Number,
				default: 0
			}
		})]
	})],
	addons: new Schema({
		title: String,
		selectType: { type: String, default: SELECT_TYPES.CHECKBOX },
		list: [ new Schema({ 
			value: {
				type: String,
				required: true
			},  
			price: {
				type: Number,
				default: 0
			}
		})]
	})
}, {
	versionKey: false,
	timestamps: true,
});

// ------------> HOOKS <---------------
ProductSchema.pre('save', async function () {
	let product = this;

	if (product.isNew) {
		const existingCategory = await Category.findById(product.categoryId);
		if (!existingCategory) throw new Error(MS.CATEGORY.IS_INVALID);
	}
});

// --------------------------> METHODS <------------------------------


const Product = mongoose.model('Product', ProductSchema);

module.exports = {
	Product,
};