const express = require("express");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")

const app = express();
const port = 3000;

app.use(express.json()) //allows express to recognise json data that i am sending into it --> this is for post requests
app.use(fileUpload())
app.use(cookieParser())
//these are all middleware. facilitate communication or perform specific functions. access to the request and response objects.
//log info about incoming requests or outgoing responses, check whether user is authenticated before allowing access to certain routes or catch errors

//EXPLANATIONS EXAMPLES 
// app.use((req, res, next) => {
//   console.log("first middleware");
//   next(); //go to next middleware
// });

// //shows hello world response from server
// app.get("/", (req, res, next) => {
//   console.log("second middleware");
//   res.send("Hello World!");
//   next();
// });

// //executed only when /two path invoked in web browser
// app.get("/two", (req, res) => {ß
//   console.log("third middleware");
//   res.send("Hello World 2!");
// });

// //executed regardless of path
// app.use((req,res) => {
//   console.log("fourth middleware");
// }) 

const apiRoutes = require("./routes/apiRoutes")

app.get('/', async (req, res, next) => {

  //EXPLANATION ON HOW TO QUERY DATABASE
  // const Product = require("./models/ProductModel")
  // try {
  //   //create new product instance
  //   const product = new Product
  //   //set name property of product
  //   product.name = "New product name"
  //   //save product to database
  //   const productSaved = await product.save()
  //   console.log(productSaved === product)
  //   //query all products from database. mongoose has array of items. 1 product created means length 1
  //   const products = await Product.find()
  //   console.log(products.length)

  //   //when u create items mongodb automatically give it an id...send response with created product's id
  //   res.send("Products created" + product._id)
  // } catch (er) {
  //   next(er)
  // }
  res.json({message:"API running,,,"})
})

//connect to mongodb
const connectDB = require("./config/db")
connectDB();

//if routes /api then u use apiRoutes the diff routes 
app.use('/api', apiRoutes)

//error handling middleware functions in this expressjs application
//logging error. logs error to console
app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
//handling error response sent back to the client. sends json response containing error message
//500 indicates internal server error
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack, //stack trace of error, provides detailed list of function calls and their line numbers, help developers trace origin of error
  });
});

//console.log
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//npx nodemon index.js -- > automatically retarts server whenver i make changes to code
//node index.js --> stop server manually and run again to see changes in page


//http response codes
//setting http status code is a way for server to communicate the outcome of a client's request. clients aka web browsers interpret status code to understand result of their request and take action
// The most used response status codes:

// 200 OK

//     Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.

// 201 Created

//     The request has been fulfilled, resulting in the creation of a new resource.

// 301 Moved Permanently

//     This and all future requests should be directed to the given URI.

// 400 Bad Request

//     The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)

// 401 Unauthorized

//     Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication. 401 semantically means "unauthorised", the user does not have valid authentication credentials for the target resource.

//   403 Forbidden

//     The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). This code is also typically used if the request provided authentication by answering the WWW-Authenticate header field challenge, but the server did not accept that authentication. The request should not be repeated.

//    404 Not Found

//     The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.

//    413 Payload Too Large

//     The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".

//    415 Unsupported Media Type

//     The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.

//    500 Internal Server Error

//     A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.


