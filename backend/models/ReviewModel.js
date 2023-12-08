const mongoose = require("mongoose")

//schema is definition of properties
const reviewSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true, 
    },
    user: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
   
}, {
    timestamps: true, 
})
reviewSchema.index() 

//This line creates a Mongoose model named "Review" based on the reviewSchema. A Mongoose model is a class with which we construct documents. In this case, each document will represent a product with a name.
const Review = mongoose.model("Review", reviewSchema)

module.exports = Review

//import this into product model