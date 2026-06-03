const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "User ID is Required"]
	},
	cartItems: [
		{
			productId: {
				type: String,
				required: [true, "Product ID is required"]
			},
			quantity: {
				type: Number,
				required: [true, "Product quantity is required"]
			},
			subTotal: {
				type: Number,
				required: [true, "Product total is required"]
			}
		}
	],
	totalPrice: {
		type: Number,
		required: [true, "Total Price is Required"]
	}
});

module.exports = mongoose.model("Cart", cartSchema);