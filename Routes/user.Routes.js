import express from  "express";
import { userLoggedInChecker, userLoginHandler, userLogoutHandler, userRegisterHandler } from "../Controllers/user.controller.js";
import { userAuthMiddleware } from "../Middlewares/userAuth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/registerUser", userRegisterHandler);
userRoutes.post("/loginUser", userLoginHandler);
userRoutes.post("/logoutUser", userLogoutHandler);
userRoutes.get("/isUserLoggedIn", userAuthMiddleware, userLoggedInChecker)

export default userRoutes;