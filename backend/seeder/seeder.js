const connectDB = require("../config/db");
connectDB(); //establish connection with mongodb database

const categoryData = require("./categories");
const Category = require("../models/CategoryModel");

const productData = require("./products");
const Product = require("../models/ProductModel");

const reviewData = require("./reviews");
const Review = require("../models/ReviewModel");

const userData = require("./users");
const User = require("../models/UserModel");

const orderData = require("./orders");
const Order = require("../models/OrderModel");


const importData = async () => {
  try {

    await Category.collection.dropIndexes({ wtimeout: 50000 });
    await Category.collection.deleteMany({}, { wtimeout: 30000 }); // 30 seconds timeout,idw categories to grow whenver i call seeder data
    await Category.insertMany(categoryData);

    await User.collection.dropIndexes({ wtimeout: 50000 });
    await User.collection.deleteMany({}, { wtimeout: 30000 }); // 30 seconds timeout,idw categories to grow whenver i call seeder data
    await User.insertMany(userData);


    await Product.collection.dropIndexes({ wtimeout: 30000 });
    await Product.collection.deleteMany({}, { wtimeout: 30000 }); // 30 seconds timeout,idw categories to grow whenver i call seeder data
    //await Product.insertMany(productData); //without additionally adding the reviews, it will be empty array first

    await Review.collection.deleteMany({}, { wtimeout: 30000 }); // 30 seconds timeout,idw categories to grow whenver i call seeder data
    const reviews = await Review.insertMany(reviewData);

    const addedReviews = productData.map((product) => {
        for (let review of reviews) {
        product.reviews.push(review.id)
        }
        return {...product}
        
    });

    await Product.insertMany(addedReviews); //only add products when reviews added in 

    await Order.collection.dropIndexes({ wtimeout: 50000 });
    await Order.collection.deleteMany({}, { wtimeout: 30000 }); // 30 seconds timeout,idw categories to grow whenver i call seeder data
    await Order.insertMany(orderData);

    console.log("Seeder data proceeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData(); //run import function, populate database with initial data during development

//how to call javascript file in node: node seeder/seeder
