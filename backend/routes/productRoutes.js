const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const getProducts = require("../controllers/productController")

router.get("/", getProducts)
module.exports = router