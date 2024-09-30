import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

export const cloudinaryUpload = async (filePath)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECERET_KEY 
    });
    try {
       const cloudinaryResult = cloudinary.uploader.upload(filePath);
    } catch (error) {
        console.log("Sorry there is some issus to upload your image on cloudinary");
    }
}