const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
	productId: {
		type: String,
		required: true,
	},
	size: {
		type: String,
	},
	color: {
		type: String,
	},
	price: {
		type: Number,
	},
	discount: {
		type: Number,
	},
	stock: {
		type: Number,
	},
	images: [
		{
			type: String,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Variant', variantSchema);
