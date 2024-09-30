import jwt from "jsonwebtoken"
import dotenv from "dotenv";
// dotenv.config();
export const tokenGenerator = async (user)=>{
    return jwt.sign({
     userID: user._id,
     userEmail : user.email,
    //  isVerified : true
    }, process.env.SECERET, 
    { expiresIn: '1h' });
}