const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")


const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.params.id});
        res.send(orders);
    } catch (err) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try {
       const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
        res.send(order);
    } catch (err) {
        next(err)
    }
}

const createOrder = async (req, res, next) => {
    try {
        console.log(req);
        const { cartItems, orderTotal, paymentMethod, userId } = req.body;
        if (!cartItems || !orderTotal || !paymentMethod) {
            return res.status(400).send("All inputs are required");
        }

        let names = cartItems.map((item) => {
            return item.name;
        })
        let qty = cartItems.map((item) => {
            return Number(item.quantity);
        })
        //update products because need to +1 to sales field
        await Product.find({ name: { $in: names } }).then((products) => {
            products.forEach(function (product, idx) {
                product.sales += qty[idx];
                product.save();
            })
        })

        const order = new Order({
            user: userId,
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod,
        })
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);

    } catch (err) {
        next(err)
    }
}

const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);

    } catch (err) {
        next(err);
    }
}

const adminUpdateOrderToDelivered = async (req, res, next) => {
    try {
       const order = await Order.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
}

const adminGetOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user","-password").sort({ paymentMethod: "desc" });
        res.send(orders);
    } catch (err) {
        next(err)
    }
}

module.exports = {getOrders, getOrder, createOrder, updateOrderToPaid, adminUpdateOrderToDelivered, adminGetOrders}

//controller function imports order model from ordermodel.js. interacts with order model to create a new order