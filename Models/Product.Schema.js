import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    // {productName, productDetails, addedBy, price} 
    productName : {
        type : String,
        required : true,
    },
    productDetails : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    photo : {
        type : String,
        required : true,
    },
    addedBy : {
        type : mongoose.Types.ObjectId,
        ref : "UserModel",
    },
    
}, {timestamps:true});

export const ProductModel = mongoose.model("ProductModel", productSchema)