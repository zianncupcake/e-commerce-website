
const jwt = require("jsonwebtoken")
//verify presence and validity of jwt in the access_token cookie
const verifyIsLoggedIn = (req, res, next) => {
    try {
        //req.cookies --> cookies is a property of the request object that is provided by middleware e.g. cookier-parser
        //access_token is the name of the cookie.
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

// Here's an example flow:

// User Authentication:
// User provides valid credentials (e.g., username and password).
// Server validates credentials and issues a JWT.

// Sending JWT to the Client:
// The server sends the JWT to the client (browser) as a cookie. This is typically done in the response to a successful login request.

// Subsequent Requests:
// For subsequent authenticated requests, the client (browser) automatically includes the access_token cookie in the request headers.

// Middleware Verification:
// Middleware on the server side (your verifyIsLoggedIn and verifyIsAdmin middleware) extracts the JWT from the cookie and verifies its validity.