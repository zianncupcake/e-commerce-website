const express = require("express")

const app = express()
const productRoutes = require("./productRoutes")

//if 2nd part of url is /products then its handled by productroutes aka /api/products
app.use("/products", productRoutes)

module.exports = app