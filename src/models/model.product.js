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

const SORT_TYPES = {
	'priceAsc': { price: 'asc' },
	'priceDesc': { price: 'desc' },
	'prepAsc':  { prepTime: 'asc' },
	'prepDesc': { prepTime: 'desc' },
};

const DIETART_TYPES = {
	GL_FREE: 'gl_free',
	HEALTHY: 'healthy',
	ORGANIC: 'organic',
	VEGAN: 'vegan',
	VEGETARIAN: 'vegetarian'
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
	dietaryType: {
		type: String,
		enum: Object.values(DIETART_TYPES)
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true,
	},
	currency: {
		type: String,
		default: 'AED'
	},
	active: {
		type: Boolean,
		default: true
	},
	size: [new Schema({
		name: String,
		description: String
	})],
	prepTime: Number,
	addons: [new Schema({
		title: String,
		selectType: { type: String, enum: Object.values(SELECT_TYPES) },
		options: [new Schema({
			name: { type: String, required: true },
			price: {
				type: String,
				default: '0'
			}
		})]
	})],
	images: [new Schema({
		url: {
			type: String
		}
	})]
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
Product.ensureIndexes({ title: 'text' });

module.exports = {
	Product,
	SORT_TYPES,
};