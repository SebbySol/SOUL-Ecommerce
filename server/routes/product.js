const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;
const router = express.Router();

// Get all products (admin only)
router.get("/all", verify, verifyAdmin, productController.getAllProducts);

// Get all active products (PUBLIC)
router.get("/active", productController.getAllActive);

// Search by name
router.post("/search-by-name", productController.searchByName);

// Search by price
router.post("/search-by-price", productController.searchByPrice);

// Get single product
router.get("/:productId", productController.getProduct);

// Create product (admin only)
router.post("/", verify, verifyAdmin, productController.addProduct);

// Update product (admin only)
router.patch("/:productId/update", verify, verifyAdmin, productController.updateProduct);

// Archive product (admin only)
router.patch("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// Activate product (admin only)
router.patch("/:productId/activate", verify, verifyAdmin, productController.activateProduct);



module.exports = router;