const mongoose = require("mongoose")
//usermodel required to know who made that order
const User = require("./UserModel")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    orderTotal: { //javascript object with the follwing properties
        itemsCount: {type: Number, required: true},
        cartSubtotal: {type: Number, required: true}
    },
    cartItems: [ //javascript array because we can have many items in cart
        {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            image: {path: {type: String, required: true}},
            quantity: {type: Number, required: true}, //number of products the user wants to buy
            count: {type: Number, required: true} //stock amount
        }
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionResult: {
        status: {type: String},
        createTime: {type: String},
        amount: {type: Number}
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false, //not delivered when order just created
    },
    deliveredAt: {
        type: Date,
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
