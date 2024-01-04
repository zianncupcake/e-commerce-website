const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
  try {
    // If the URL is /api/products?pageNum=1&price=50&rating=4,5, the price object becomes { price: { $lte: 50 } }, the rating object becomes { rating: { $in: ['4', '5'] } }, and the query object becomes { $and: [{ price: { $lte: 50 } }, { rating: { $in: ['4', '5'] } }] }.
    // This final query would fetch products with prices less than or equal to 50 and ratings 4 or 5.
    //does req.query.price parameter in the url exist? if yes means client specified max price. $lte: mongodb query condition ==> products with a price less than or equal to specified max price
    const price = req.query.price
      ? { price: { $lte: Number(req.query.price) } }
      : {};
    //does req.query.rating parameter in the url exist? if yes means client specified one or more ratings. $in: mongodb query condition ===> check for products with a rating that is in the list of specified ratings
    const rating = req.query.rating
      ? { rating: { $in: req.query.rating.split(",") } }
      : {};

    const categoryName = req.params.categoryName || "";
    //constructs query condition object to match documents where category field matches the specified regular expression
    //$regex --> performing regular expression match on the category field
    // e.g. /category/Electronics,%20Gadgets
    // {
    //     category: {
    //       $regex: /^Electronics\/ Gadgets/
    //     }
    //   }
    const categoryCondition = categoryName
      ? {
          category: {
            $regex: new RegExp("^" + categoryName.replaceAll(",", "/")),
          },
        }
      : {};
    //create query condition to match products with category that is in list of specified categories
    //split string by commas, map each item into reg expression
    //$in --> operator used to match documents where the specified fields value = any value in the provided array
    // e.g. /products?category=Electronics,%20Gadgets
    // {
    //     category: {
    //       $in: [
    //         /^Electronics/,
    //         /^Computers/
    //       ]
    //     }
    //   }
    const categoryConditionFromQuery = req.query.category
      ? {
          category: {
            $in: req.query.category
              .split(",")
              .map((item) => item && new RegExp("^" + item)),
          },
        }
      : {};

    //return documents where there is at least 1 attribute with the key ram and a value that matches any of the specified values
    //e.g. /products?attrs=RAM-1TB-2TB,color-blue-red
    //returns an array of objects. designed to handle the case of multiple attributes specified in the query params
    // [
    //     { attrs: { $elemMatch: { key: 'RAM', value: { $in: ['4GB', '16GB'] } } } },
    //     { attrs: { $elemMatch: { key: 'color', value: { $in: ['blue', 'black'] } } } },
    // ];
    const attrsQueryCondition = req.query.attrs
      ? req.query.attrs.split(",").map((item) => {
          if (item) {
            const [key, ...values] = item.split("-"); //the array looks like [colour-red-blue-green]
            //operator used to specify multiply criteria on elements of array. at least 1 elemt in the array must satisfy specified conditions within $in
            return { attrs: { $elemMatch: { key, value: { $in: values } } } };
          }
        })
      : [];

    const searchQuery = req.params.searchQuery || "";
    //text search condition. $text operator indicates a text search and specfies search string using $search --> search for documents containing a particular text
    //e.g. /products/search/laptop
    const searchQueryCondition = searchQuery
      ? { $text: { $search: searchQuery } }
      : {};

    //final mongodb query object used to fetch products from database. $and operator means if either exists, include that condition. if both conditions exist, both must be satisfied
    const setQuery =
      Object.keys(price).length || //object.keys returns an array containing object's property names
      Object.keys(rating).length ||
      Object.keys(categoryCondition).length ||
      Object.keys(categoryConditionFromQuery).length ||
      attrsQueryCondition.length || //dont need object.keys because of its nature as an array. the rest are objects
      Object.keys(searchQueryCondition).length
        ? {
            $and: [
              price,
              rating,
              categoryCondition,
              categoryConditionFromQuery,
              ...attrsQueryCondition,
              searchQueryCondition,
            ],
          }
        : {};
    const pageNum = Number(req.query.pageNum) || 1; //if nv specify query then it default 1
    const totalProducts = await Product.countDocuments(setQuery);

    let sortBy = {}; // let allows flexible reassignment
    let selectBy = {};

    if (Object.keys(searchQueryCondition).length) {
      // If searchQueryCondition is present, sort by textScore. MOST RELEVANT RESULT
      //$meta operator accesses metadata associated with certain operations. when performing a text search using the $text operator, MongoDB assigns a score to each document based on its relevance to the search query.
      sortBy = { score: { $meta: "textScore" } };
      selectBy = { score: { $meta: "textScore" } };
    } else {
      // If no specific sorting option, check for other sorting options. SORT BY
      const sortOption = req.query.sort || "";
      if (sortOption) {
        let splitted = sortOption.split("_"); //the frontend is like e.g. price_1
        sortBy = { [splitted[0]]: Number(splitted[1]) };
      }
    }

    //find -- method used to query and retrieve documents from mongodb selection, returns cursor that u can iterate over to access documents that match specified query conditions
    //select -- shape output where u specify which fields to be included/excluded in result documents --> control structure of documents returned by query. in this case im just adding the score
    //skip -- dont query the first x items
    //limit useful when doing pagination because we want to limit how many we have on each page --> just query that number
    const products = await Product.find(setQuery)
      .select(selectBy) // include fields specified in selectBy in the result documents
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sortBy)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNum: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    //findbyid --> mongodb query using mongoose. find producrt by its id
    //populate replaces review references with actual review documents, will show fields like user/time/rating
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

//i see, so the error was that when i did /bestsellers, mongoose interpret it as an /:id so it was kind of a conflicting route

const getBestSellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $replaceWith: "$doc_with_max_sales" },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
      const productExists = await Product.findOneAndDelete({_id: req.params.id})
      if (productExists) {
          res.json({ productDeleted: true }); // json response sent back to client to indicate category successfully deleted
      } else {
          res.status(404).json({ error: 'product not found' });
      }
} catch (err) {
      next(err);
  }
};


const adminCreateProduct = async (req, res, next) => {
  try {
    //create new instance of product model
    const product = new Product();
    //destruture properties from req.body
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    //save method. save newly created 'product' instance to database
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
  //a function for validation 
  const imageValidate = (images) => {
    let imagesTable = [];
    if (Array.isArray(images)) {
      imagesTable = images;
    } else {
      imagesTable.push(images);
    }

    if (imagesTable.length > 3) {
      return { error: "Send only 3 images at once" };
    }
    for (let image of imagesTable) {
      if (image.size > 1048576) return { error: "Size too large (above 1 MB)" };

      const filetypes = /jpg|jpeg|png/;
      const mimetype = filetypes.test(image.mimetype);
      if (!mimetype)
        return { error: "Incorrect mime type (should be jpg,jpeg or png" };
    }

    return { error: false };
  };
  //sample api call /admin/upload?productId=fjfnjiviw
  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    //nodejs module used for handling file and directory files
    const path = require("path");
    //uuidv4 --> new unique identifier to the console. just generates a unique identifier for each iteration
    const { v4: uuidv4 } = require("uuid");
    //define upload directory where uploaded files will be stored. path.resolve creates an absolute path based on current directory __dirname and the specified relative path
    const uploadDirectory = path.resolve(__dirname, "../../frontend", "public", "images", "products")
    let product = await Product.findById(req.query.productId).orFail()

    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for(let image of imagesTable) {
        var fileName = uuidv4() + path.extname(image.name)
        
        //path.extname(image.name) -->  file extension of the image 
        //construct upload path
        var uploadPath = uploadDirectory + "/" + fileName
        product.images.push({ path: "/images/products/" + fileName})
        //move uploaded file to specified upload path using mv method, a commonly provided file upload middlewear
        //uploded onto destination path uploadPath, then callback function executed after the file has been moved
        image.mv(uploadPath, function(err) {
            if(err) {
                return res.status(500).send(err)
            }
        })
    }
    //wait until new document successfully saved into database then execute. mongooose save method used to persist the document to the database
    await product.save()
    return res.send("Files uploaded!")


    
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
    try {
        //decode any url encoded components: necessary because urls may contain special characters encoded for safe transmission
      const imagePath = decodeURIComponent(req.params.imagePath);
        //path built in node js module for handling file paths
      const path = require("path");
      //generate absolute path segments --> represent absolute file path on the server where the image file is expected to be located
      const finalPath = path.resolve("../frontend/public") + imagePath;
        //imports fs module with promises support. provides set of file system methods that return promises, making them easier to work with in async await context
      const fs = require("fs").promises;
  
      // fs.unlink is a method for deleting the file located at the path finalPath
      await fs.unlink(finalPath);
  
      // mongoose method. Update the product in the database
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        //pull operator removes specified element from images array based on the condition {path:imagePath}
        { $pull: { images: { path: imagePath } } }
      ).orFail();
  
      return res.status(204).end(); // Respond with 204 No Content for successful deletion
    } catch (err) {
      // Handle errors
      console.error(`Error deleting file or updating database: ${err.message}`);
      next(err); // Pass the error to the next middleware or error handler
    }
  };
  
  module.exports = adminDeleteProductImage;
  

module.exports = {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage
}; //e.g. products?pageNum=1&sort=name_-1

//controller function imports product model from productmodel.js. interacts with product model to create a new product

// in charge of end point for frontend where they want to sort results on the product list page e.g. price low to high
