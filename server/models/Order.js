const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'User ID is Required']
	},
	productsOrdered: [
		{
			productId: {
				type: String,
				required: [true, 'Product ID is required']
			},
			quantity: {
				type: Number,
				required: [true, 'Product quantity is required']
			},
			subTotal: {
				type: Number,
				required: [true, 'Product total is required']
			}
		}
	],
	totalPrice: {
		type: Number,
		required: [true, 'Total Price is Required']
	},
	orderedOn: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: "Pending"
	}
});

module.exports = mongoose.model('Order', orderSchema);