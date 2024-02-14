import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminLogin from "../models/loginSchema.js";
import jwt from "jsonwebtoken";
dotenv.config();
const {SECRET, EMAIL, PASSWORD} = process.env;

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


// .................................Forgot Page Logic......................................//

export const forgotAdminPassword = async (req, res) => {
  try {
    const user = await AdminLogin.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Email not found. Register Now!");
    }
    // Generate a random token
    const secret = user._id + SECRET;
    let token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "15m",
    });
    // const link = `https://gauravnodejsauthentication.onrender.com/resetPassword/${user._id}/${token}`;
    const link = `http://localhost:7000/resetPassword/${user._id}/${token}`;
    
    //...................................Nodemailer code.......................................//
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL, //own email id
        pass: PASSWORD, // own emailid password
      },
    });
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        // .......................Appears in header & footer of e-mails......................//
        name: "Eleedom IMF Pvt Ltd",
        link: "https://mailgen.js/",
        copyright:
          "Copyright © 2024 Eleedom IMF Pvt Ltd. All rights reserved.",
      },
    });
    //...................................Prepare email contents..............................//
    let response = {
      body: {
        name: "Admin",
        intro: [
          "You have received this email because a password reset request for your account was received.",
          "Valid till 15 Minutes only!",
        ],
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#A31217",
            text: "Reset your password",
            link: link,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };
    // .......................................Generate email....................................//
    const mail = mailGenerator.generate(response);
    //........................................Send email........................................//
    transporter.sendMail(
      {
        from: '"Eleedom IMF Pvt Ltd"<example@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Password Reset Request", // Subject line
        html: mail,
      },

      (error, info) => {
        if (error) {
          res.status(500).json("Email not sent. Register Yourself!", error);
        }
        return res.status(200).json("Email sent successfully.");
      }
    );
  } catch (error) {
    return res.status(500).json("An error occurred..!", error);
  }
};