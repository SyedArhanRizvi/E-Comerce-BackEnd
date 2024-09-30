import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.Routes.js";
import productRoutes from "./Routes/product.Routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// const corsOptions = {
//     origin: "*", // Replace with your frontend domain
//     credentials: true,            // Enable the Access-Control-Allow-Credentials header
//     methods: ["GET" , "POST" ,  "Delete"],          // Allowed methods
//     allowedHeaders: 'Content-Type, Authorization', // Allowed headers
//   };

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));



mongoose.connect(process.env.DB_NAME)
.then(() => {
    console.log('DB Connected')
}).catch((err)=>{
    console.log(err);
})


app.use("/api", userRoutes);
app.use("/api/product", productRoutes);

app.listen(process.env.PORT, ()=> {
    console.log("Your Data base has been successfully connected and hosted on this server ", process.env.PORT); 

})