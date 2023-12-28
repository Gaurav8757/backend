import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminLogin from "../models/loginSchema.js";
import jwt from "jsonwebtoken";
dotenv.config();
const {SECRET} = process.env

// ####################################### Register User ###########################################//
export const adminRegister = async (req, res) => {
  try {
    const { name, email, mobile, password, gender, isAdmin } = req.body;

    // const serialNumber = generateSerialNumber();

    // Check if the user with the given email already exists
    const emailExist = await AdminLogin.findOne({ email });
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
    const newUser = new AdminLogin({
      // sr_no: serialNumber,
      name,
      email,
      mobile,
      gender,
      isAdmin,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({
      status: "User Registered Successfully",
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


//######################## login admin ###########################//
export const loginAdmin = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    let user;
    if (email) user = await AdminLogin.findOne({ email });
    else if (mobile) user = await AdminLogin.findOne({ mobile });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
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
        isAdmin: user.isAdmin,
        token,
      });
    }}
   catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}
