const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const getOrder = require("../controllers/orderController")

router.get("/", getOrder)
module.exports = router

