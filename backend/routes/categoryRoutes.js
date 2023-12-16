const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const {getCategories, newCategory, deleteCategory, saveAttr} = require("../controllers/categoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')


router.get("/", getCategories) //GET request

router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/", newCategory) //POST request

//makes use of req.params. an object containing properties mapped to the named route parameters. e.g. if a request is made to /categories/games then req.params.category is games
router.delete("/:category", deleteCategory) // DELETE request -- dynamic paramteres

router.post("/attr", saveAttr)
module.exports = router

//routes call controller --> controller call model 