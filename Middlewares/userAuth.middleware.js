import jwt from "jsonwebtoken"
import { UserModel } from "../Models/User.Schema.js";
// import { UserModel } from "../Models/User.Schema.js";
import dotenv from "dotenv"
dotenv.config();

export const userAuthMiddleware = async (req, res, next)=>{
    const { auth_token } = req.cookies;
     const decode_token = jwt.verify(auth_token, process.env.SECERET);
     console.log(decode_token);
    try {
         
         const loggedInUser = await UserModel.findById(decode_token.userID).exec();
         if(!loggedInUser) console.log("User Not Found");
         req.user = loggedInUser;
         next();
         console.log("User founded ", loggedInUser);    
    } catch (error) {
        return res.send(401).json({message:error})
    }
   
    
    next();
    
}