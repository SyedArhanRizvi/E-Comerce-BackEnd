import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    // {fName, lName, username, email, phone, password}
    {
        fName : {
            type : String,
            
        },
        lName : {
            type : String,
            
        },
        username : {
            type : String,
            
            unique : true,
        },
        email : {
            type : String,
            
            unique : true,
        },
        phone : {
            type : Number,
            
        },
        password : {
            type : String,
            
        },
    },
    {
        timestamps:true,
    }
)

export const UserModel = mongoose.model("UserModel", userSchema);