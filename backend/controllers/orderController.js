const Order = require("../models/OrderModel")

const orderController = (req, res) => {
    res.send("Handling order routes, e.g. search for orders")
}
module.exports = orderController

//controller function imports order model from ordermodel.js. interacts with order model to create a new order