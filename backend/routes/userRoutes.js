const express = require('express')

//creates a modular mountable set of routes
const router = express.Router()

const {getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, adminGetUser,adminGetUsers, adminUpdateUser, adminDeleteUser} = require("../controllers/userController")
const { verifyIsAdmin, verifyIsLoggedIn } = require('../middleware/verifyAuthToken')

router.post("/register", registerUser)
router.post("/login", loginUser)

//COME BACK TO AUTHENTICATION LATER

//user logged in routes
// router.use(verifyIsLoggedIn)
router.put("/profile/:id", updateUserProfile)
router.get("/profile/:id", getUserProfile) //users update their own info
router.post("/review/:productId", writeReview)

//admin routes
// router.use(verifyIsAdmin)
router.get("/admin", adminGetUsers)
router.get("/admin/:id", adminGetUser)
router.put("/admin/:id", adminUpdateUser) //admin updates other users info , able to change whether this user is admin
router.delete("/admin/:id", adminDeleteUser)
module.exports = router

