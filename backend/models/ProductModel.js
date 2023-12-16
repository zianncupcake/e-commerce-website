const mongoose = require("mongoose")
const Review = require("./ReviewModel")

const imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
    }
})

//schema is definition of properties
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, //gives error if not given 
        unique: true, //gives error if prouduct name duplicated
    },
    description: {
        type: String,
        required: true, //gives error if not given 
    },
    category: {
        type: String,
        required: true, //gives error if not given 
    },
    count: {
        type: Number, //items in stock
        required: true, //gives error if not given 
    },
    price: {
        type: Number,
        required: true, //gives error if not given 
    },
    rating: {
        type: Number,
    },
    reviewsNumber: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0 
    },
    attrs: [
        {key: {type: String}, value: {type: String}}
    ],
    images: [imageSchema],
    //one product can have many reviews. one to many. thats why we have array of objects
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, //_id
            ref: Review,
        }
    ]
}, {
    timestamps: true, //show timestamp at which product created
})

//This line creates a Mongoose model named "Product" based on the productSchema. A Mongoose model is a class with which we construct documents. This model is based on the productSchema In this case, each document will represent a product with a name.
const Product = mongoose.model("Product", productSchema)

//indexes improve speed of queries,
// productSchema.index(
//     {name:"text",description: "text"}, //creates a text idnex on the name and description fields. perform text search operations on these fields efficienctly. 
//     {name: "TextIndex"} //optional name for the index
// )

// productSchema.index(
//     {"attrs.key":1, "attrs.value":1} // a compound index. requires multiple fields, useful if u frequently query based on attrs.jey and attrs.value combi
//     //1 means ascending
// )

module.exports = Product

//basically defines the structure of the product model e.g. properties, validation rules.
//doesnt create the actual product yet. just defining