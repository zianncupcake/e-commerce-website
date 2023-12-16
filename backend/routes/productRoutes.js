const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const {getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage} = require("../controllers/productController")
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')

router.get("/", getProducts)
router.get("/category/:categoryName", getProducts)
router.get("/category/:categoryName/search/:searchQuery", getProducts)
router.get("/search/:searchQuery", getProducts)
router.get("/getone/:id", getProductById) // details of specfic product
router.get("/carousel/bestsellers", getBestSellers) //get bestsellers for carousel on homepage. best seller for each cat

router.use(verifyIsLoggedIn) //middleware applied to all routes defined within the router. only affect routes defined after it 
router.use(verifyIsAdmin)
router.get("/admin", adminGetProducts)
router.delete("/admin/:id", adminDeleteProduct)
router.post("/admin", adminCreateProduct)
router.put("/admin/:id", adminUpdateProduct) //put commonly used to update existing resource or create a new resource if it doesnt exist
router.post("/admin/upload", adminUpload) //used to upload images when creating product. using 2 separate api endpoints for 1 create new product page
//to test: can get impage path by encodeURIComponent(path in database)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)

module.exports = router

//console.log(encodeURIComponent("/images/products/081a542f-f71b-4665-9960-722d04d2d634.jpeg"))


