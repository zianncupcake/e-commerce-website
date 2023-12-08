const Product = require("../models/ProductModel")

const productController = (req, res) => {
    Product.create({name: "Panasonic"})
    res.send("Handling product routes, e.g. search for products")
}
module.exports = productController

//controller function imports product model from productmodel.js. interacts with product model to create a new product