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
  //     // store LOGIN userId in session
  //   req.session.userId = user._id;
  // console.log(req.session.userId);
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


// ############################ Read User ###############################
// export const readAllUsers = async (req, res) => {
//     const token = req.headers["authorization"];
//     //  this query get all users details at a time
//     const userExist = await User.find({});
//     if (!token) {
//       return res.status(401).json({ error: " Token Unauthorized" });
//     }
//     jwt.verify(token, process.env.pass_key, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }
//       return res.json({
//         // message: "Welcome to the admin page",
//         userExist,
//       });
//     });
//   };
  
  //############################ Delete User ###############################
//   export const deleteUser = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const deletedUser = await User.findByIdAndRemove(userId);
//       if (!deletedUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       return res.json({ message: "User deleted successfully", deletedUser });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
  