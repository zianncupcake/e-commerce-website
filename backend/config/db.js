require("dotenv").config();

const mongoose = require("mongoose");

//connect to mongodb using mongoose
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("mongodb connection success")
    } catch (error) {
        console.error("mongodb connection fail");
        process.exit(1)


    } 

}

module.exports = connectDB