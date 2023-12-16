const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const {getUsers, registerUser, loginUser, updateUserProfile} = require("../controllers/userController")
const { verifyIsAdmin, verifyIsLoggedIn } = require('../middleware/verifyAuthToken')

router.post("/register", registerUser)
router.post("/login", loginUser)

//user logged in routes
router.use(verifyIsLoggedIn)
router.put("/profile", updateUserProfile)


//admin routes
//router.use(verifyIsAdmin)
router.get("/", getUsers)
module.exports = router
