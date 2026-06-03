const express = require("express");
const orderController = require("../controllers/order");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post("/checkout", verify, orderController.checkout);

// Retrieve all orders (admin only)
router.get("/all-orders", verify, verifyAdmin, orderController.getAllOrders);

// Retrieve authenticated user's orders
router.get("/my-orders", verify, orderController.getMyOrders);

module.exports = router;