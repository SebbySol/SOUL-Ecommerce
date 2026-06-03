const Product = require("../models/Product");
const { errorHandler } = require("../auth");

// Add Product
module.exports.addProduct = (req, res) => {

    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    Product.findOne({ name: req.body.name })
    .then(existingProduct => {
        if (existingProduct) {
            return res.status(409).send({ message: "Product already exists" });
        } else {
            return newProduct.save()
            .then(result => res.status(201).send({
                success: true,
                message: "Product added successfully",
                result: result
            }))
            .catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Get All Products
module.exports.getAllProducts = (req, res) => {
    return Product.find({})
    .then(result => {
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({ message: "No product found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Get Active Products
module.exports.getAllActive = (req, res) => {
    return Product.find({ isActive: true })
    .then(result => {
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({ message: "No active products found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Get Single Product
module.exports.getProduct = (req, res) => {
    return Product.findById(req.params.productId)
    .then(product => {
        if (product) {
            return res.status(200).send(product);
        } else {
            return res.status(404).send({ message: "Product not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Update Product
module.exports.updateProduct = (req, res) => {

    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };

    return Product.findByIdAndUpdate(req.params.productId, updatedProduct)
    .then(product => {
        if (product) {
            return res.status(200).send({
                success: true,
                message: "Product updated successfully"
            });
        } else {
            return res.status(404).send({ message: "Product not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Archive Product
module.exports.archiveProduct = (req, res) => {

    return Product.findByIdAndUpdate(
        req.params.productId,
        { isActive: false }
    )
    .then(product => {
        if (product) {
            return res.status(200).send({
                success: true,
                message: "Product archived successfully"
            });
        } else {
            return res.status(404).send({ message: "Product not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Activate Product
module.exports.activateProduct = (req, res) => {

    return Product.findByIdAndUpdate(
        req.params.productId,
        { isActive: true }
    )
    .then(product => {
        if (product) {
            return res.status(200).send({
                success: true,
                message: "Product activated successfully"
            });
        } else {
            return res.status(404).send({ message: "Product not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Search Name
module.exports.searchByName = (req, res) => {

    Product.find({ name: { $regex: req.body.name, $options: 'i' } })
    .then(products => {

        if(products.length > 0) {
            return res.status(200).send(products);
        } else {
            return res.status(404)
            .send({ message: 'No products found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

// Search Price
module.exports.searchByPrice = (req, res) => {

    Product.find({ price: { $gte: req.body.minPrice, $lte: req.body.maxPrice } })
    .then(products => {

        if(products.length > 0) {
            return res.status(200).send(products);
        } else {
            return res.status(404)
            .send({ message: 'No products found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};