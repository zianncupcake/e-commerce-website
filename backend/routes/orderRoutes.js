const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const {getOrders, getOrder, createOrder, updateOrderToPaid, adminUpdateOrderToDelivered, adminGetOrders} = require("../controllers/orderController")
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')

//user routes
//router.use(verifyIsLoggedIn)
router.get("/:id", getOrders) //get my orders
router.get("/getone/:id", getOrder)
router.post("/", createOrder)
router.put("/paid/:id", updateOrderToPaid)

//admin routes
//router.use(verifyIsAdmin)
router.put("/admin/delivered/:id", adminUpdateOrderToDelivered)
router.get("/admin", adminGetOrders)
module.exports = router

