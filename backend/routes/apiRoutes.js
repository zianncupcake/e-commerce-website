const express = require("express")

const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoutes")

const jwt = require("jsonwebtoken");

app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").send("access token cleared");
  });  

//defines route with get method. when request made at this end point, server retrieve access token from request's cookies.
app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        //verify token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    } catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
})



//if 2nd part of url is /products then its handled by productroutes aka /api/products
app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)

module.exports = app