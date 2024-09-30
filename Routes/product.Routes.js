import express from "express";
import { upload } from "../Middlewares/multer.productPhoto.js";
import { addProducts, deleteProduct, getAllProducts } from "../Controllers/product.controller.js";

const productRoutes = express.Router();

productRoutes.post("/addProduct", upload.single("photo"), addProducts);
productRoutes.get("/getAllProduct", getAllProducts);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;