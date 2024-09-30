import { ProductModel } from "../Models/Product.Schema.js";
import { cloudinaryUpload } from "../Utils/cloudinary.js";

export const addProducts = async (req, res) => {
    const {productName, productDetails, addedBy, price} = req.body;
    const photoLink = req.file ? req.file.path : null;
    try {
        const photo = await cloudinaryUpload(photoLink);
        const data = await ProductModel.create({productName, productDetails, price, photo});
        console.log("Your Product has been successfully added in data base ", data);
        return res.status(200).json({message:"Your Product has been successfully added in data base"});
    } catch (error) {
        console.log("Sorry we cant save your product due to this error ", error);
        return res.status(401).json({message: "There is some issus in your provided data"})
    }
}
export const getAllProducts = async (req, res)=>{
    try {
        const allData = await ProductModel.find();
        return res.status(201).json(allData);
    } catch (error) {
        console.log("There is some issus so we cant send you all data plz fixed the bug ", error);
        return res.status(500).json({message:"There is some issus so we cant send you all data plz fixed the bug"});
    }
}
export const deleteProduct = async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        return res.status(201).json({message:"Product has been successfully deleted"});
    } catch (error) {
        console.log("There is some issus so we cant delete you product plz fixed the bug ", error);
        return res.status(500).json({message:"There is some issus so we cant delete your product plz fixed the bug"});
    }
}