import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Mailgen from "mailgen";
import FinanceLogin from "../../models/finance/financeSchema.js";
import jwt from "jsonwebtoken";
dotenv.config();
const {SECRET, EMAIL, PASSWORD, LINK} = process.env;

// ####################################### Register finance ###########################################//
export const financeRegister = async (req, res) => {
  try {
    const { name, email, mobile, password, gender } = req.body;
    // Check if user already exists in the database
    const emailExist = await FinanceLogin.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        status: "User Already Exists",
        message: "User with this email already exists.",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new FinanceLogin({
      name,
      email,
      mobile,
      gender,
      password: hashedPassword,
    });
    // Save the new user to the database
    await newUser.save();
    return res.status(201).json({
      status: "Finance Admin Registered Successfully",
      message: {
        newUser,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during registration",
      message: err.message,
    });
  }
};


//######################## login finance ###########################//
export const loginFinance = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    let user;
    if (email) user = await FinanceLogin.findOne({ email });
    else if (mobile) user = await FinanceLogin.findOne({ mobile });

    if (!user) {
      return res.status(401).json({
        message: "Finance User Not Found",
      });
    }
    // password check
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json("Password is Incorrect");
    }else{
   
    // User authentication successful; create a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
     SECRET,
      {
        expiresIn: "24h",
      }
    );
 
   return res.status(200).json({
        message: "Login Successful",
        email: user.email,
        mobile: user.mobile,
        name: user.name,
        token,
      });
    }}
   catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}
