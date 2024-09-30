import { UserModel } from "../Models/User.Schema.js";
import { tokenGenerator } from "../Utils/tokenGenerator.js";
import bcrypt from "bcrypt";

export const userRegisterHandler = async (req, res) => {
  let { fName, lName, username, email, phone, password } = req.body;
  console.log(fName, lName, username, email, phone, password);
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // password = hashedPassword;
    const response = await UserModel.create({
      fName,
      lName,
      username,
      email,
      phone,
      password : hashedPassword,
    });
    console.log("User has been successfully registered ", response);
    return res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    console.log(
      "Sorry we can't register your bcz there is some issus in your provided user data ",
      error
    );
    return res
      .status(401)
      .json({
        message:
          "Sorry we can't register your bcz there is some issus in your provided user data",
      });
  }
};

export const userLoginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({email: email}).exec();
    if (!user) {
      console.log("User dose't exist");
      return res.status(401).json({ message: "User not found" });
    }
    console.log("This is finded user ", user);
    
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      console.log("Incorrect Password");
      return res.send(401).json({ message: "User Password Incorrect" });
    }
    const token = await tokenGenerator(user);
    return res
    .status(201).
      cookie("auth_token", token, {
        maxAge: 3600000,
      })
      .json({ message: "User logged in Successfully" });
  } catch (error) {
    console.log(
      "Sorry You could't login plz try once and correct your email or password ",
      error
    );
    return res.status(401).json({ message: "You could't logged in" });
  }
};

export const userLogoutHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne(email);
    if (!user) {
      console.log("User dose't exist");
      return res.status(401).json({ message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      console.log("Incorrect Password");
      return res.send(401).json({ message: "User Password Incorrect" });
    }
    return res.status(201).clearCookie("auth_token");
  } catch (error) {
    console.log(
      "Sorry You could't login plz try once and correct your email or password ",
      error
    );
    return res.status(401).json({ message: "You could't logged in" });
  }
};

export const userLoggedInChecker = (req, res) =>{
  return res.send(201).json({message:"User Exist"})
}
