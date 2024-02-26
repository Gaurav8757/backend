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
    const { finname, finemail, finmobile, finpassword, fingender } = req.body;
    // Check if user already exists in the database
    const emailExist = await FinanceLogin.findOne({ finemail });
    if (emailExist) {
      return res.status(400).json({
        status: "User Already Exists",
        message: "User with this email already exists.",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(finpassword, salt);

    // Create a new user
    const newUser = new FinanceLogin({
      finname,
      finemail,
      finmobile,
      fingender,
      finpassword: hashedPassword,
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
    const { finemail, finmobile, finpassword } = req.body;

    let user;
    if (finemail) user = await FinanceLogin.findOne({ finemail });
    else if (finmobile) user = await FinanceLogin.findOne({ finmobile });

    if (!user) {
      return res.status(401).json({
        message: "Finance User Not Found",
      });
    }
    // password check
    const isValidPassword = await bcrypt.compare(finpassword, user.finpassword);
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
        email: user.finemail,
        mobile: user.finmobile,
        name: user.finname,
        token,
      });
    }}
   catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}
