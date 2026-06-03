const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { errorHandler } = require("../auth");

module.exports.checkout = (req, res) => {

	return Cart.findOne({ userId: req.user.id })
	.then(cart => {

		if(!cart) {
			return res.status(200).send({ message: "No cart found" });
		}

		if(cart.cartItems.length === 0) {
			return res.status(200).send({ message: "Cart is empty" });
		}

		let newOrder = new Order({
			userId: req.user.id,
			productsOrdered: cart.cartItems,
			totalPrice: cart.totalPrice
		});

		return newOrder.save()
		.then(savedOrder => res.status(201).send({
			message: "Order created successfully",
			order: savedOrder
		}))
		.catch(error => errorHandler(error, req, res));
	})
	.catch(error => errorHandler(error, req, res));
};

// Get all orders
module.exports.getAllOrders = (req, res) => {
	Order.find({})
		.then(orders => {
			if(orders.length > 0) {
				return res.status(200).send(orders);
			} else {
				return res.status(404).send({ message: "No Orders found"});
			}
		})
	.catch(error => errorHandler(error, req, res));
};

// Get authenticated user's orders
module.exports.getMyOrders = (req, res) => {

    Order.find({ userId: req.user.id })
    .then(orders => {

        if(orders.length > 0) {
            return res.status(200).send(orders);
        } else {
            return res.status(404).send({ message: 'No orders found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};