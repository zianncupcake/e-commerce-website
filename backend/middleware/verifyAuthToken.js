
const jwt = require("jsonwebtoken")
//verify presence and validity of jwt in the access_token cookie
const verifyIsLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.access_token //retrieve token from access_token cookie 
        if(!token) {
           return res.status(403).send("A token is required for authentication") 
        }

        try {
            //jwt.verify method decode token and check validity against secret key
           const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (err) {
          return res.status(401).send("Unauthorized. Invalid Token")  
        }

    } catch(err) {
        next(err)
    }
}

const verifyIsAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).send("Unauthorized. Admin required")
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin }
