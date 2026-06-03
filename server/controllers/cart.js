const Cart = require("../models/Cart");
const { errorHandler } = require("../auth");

module.exports.getCart = (req, res) => {

	return Cart.findOne({ userId: req.user.id })
	.then(cart => {

		if(!cart) {
			return res.status(200).send({ message: "No cart found" });
		}

		return res.status(200).send({ cart: cart });
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.addToCart = (req, res) => {

	let subTotal = req.body.subTotal;

	if(!subTotal) {
		subTotal = req.body.price * req.body.quantity;
	}

	return Cart.findOne({ userId: req.user.id })
	.then(cart => {

		if(!cart) {

			let newCart = new Cart({
				userId: req.user.id,
				cartItems: [
					{
						productId: req.body.productId,
						quantity: req.body.quantity,
						subTotal: subTotal
					}
				],
				totalPrice: subTotal
			});

			return newCart.save()
			.then(savedCart => res.status(201).send({
				message: "Cart created successfully",
				cart: savedCart
			}))
			.catch(error => errorHandler(error, req, res));
		}

		let productIndex = cart.cartItems.findIndex(item => item.productId == req.body.productId);

		if(productIndex > -1) {
			cart.cartItems[productIndex].quantity += req.body.quantity;
			cart.cartItems[productIndex].subTotal += subTotal;
		} else {
			cart.cartItems.push({
				productId: req.body.productId,
				quantity: req.body.quantity,
				subTotal: subTotal
			});
		}

		cart.totalPrice += subTotal;

		return cart.save()
		.then(updatedCart => res.status(200).send({
			message: "Product added to cart successfully",
			cart: updatedCart
		}))
		.catch(error => errorHandler(error, req, res));
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.changeProdQuantity = (req, res) => {

	return Cart.findOne({ userId: req.user.id })
	.then(cart => {

		if(!cart) {
			return res.status(200).send({ message: "No cart found" });
		}

		let item = cart.cartItems.find(item => item.productId == req.body.productId);

		if(!item) {
			return res.status(200).send({ message: "Product not found in cart" });
		}

		let oldSubTotal = item.subTotal;

		let price = item.subTotal / item.quantity;

		item.quantity = req.body.newQuantity;

		item.subTotal = price * req.body.newQuantity;

		cart.totalPrice = cart.totalPrice - oldSubTotal + item.subTotal;

		return cart.save()
		.then(updatedCart => res.status(200).send({
			message: "Cart updated successfully",
			cart: updatedCart
		}))
		.catch(error => errorHandler(error, req, res));
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.removeFromCart = (req, res) => {

	return Cart.findOne({ userId: req.user.id })
	.then(cart => {

		if(!cart) {
			return res.status(200).send({ message: "No cart found" });
		}

		let productIndex = cart.cartItems.findIndex(item => item.productId == req.params.productId);

		if(productIndex === -1) {
			return res.status(200).send({ message: "Product not found in cart" });
		}

		cart.totalPrice -= cart.cartItems[productIndex].subTotal;

		cart.cartItems.splice(productIndex, 1);

		return cart.save()
		.then(updatedCart => res.status(200).send({
			message: "Product removed from cart successfully",
			cart: updatedCart
		}))
		.catch(error => errorHandler(error, req, res));
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.clearCart = (req, res) => {

	return Cart.findOne({ userId: req.user.id })
	.then(cart => {

		if(!cart) {
			return res.status(200).send({ message: "No cart found" });
		}

		cart.cartItems = [];
		cart.totalPrice = 0;

		return cart.save()
		.then(updatedCart => res.status(200).send({
			message: "Cart cleared successfully",
			cart: updatedCart
		}))
		.catch(error => errorHandler(error, req, res));
	})
	.catch(error => errorHandler(error, req, res));
};