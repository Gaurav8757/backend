import OpsAdmin from "../../models/ops/opsadmin.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { generatePassword } from "../generateId.js";
dotenv.config();
const { SECRET } = process.env;

export const addOpsRegister = async (req, res) => {
  try {
    const {
      opsid,
      opsname,
      opsemail,
      opsmobile,
      opsgender,
      opsdate,
      opsjoiningdate,
      permanentopsaddress,
      currentopsaddress,
      
    } = req.body;


    // Generate a password
    const opspasswords = generatePassword(opsemail);
    //  encrypt password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(hrpasswords, salt);
    const OpsExist = await OpsAdmin.findOne({ opsid });
    if (OpsExist) {
      return res.status(400).json({
        status: "HR Already Exists",
        message: "HR with the given hrid already exists.",
      });
    }
  
    // Create a new ops instance
    const newOps = new OpsAdmin({
        opsid,
        opsname,
        opsemail,
        opsmobile,
        opsgender,
        opspassword: opspasswords,
        opsdate,
        opsjoiningdate,
        permanentopsaddress,
        currentopsaddress,
    });
    // Save the hr to the database
    await newOps.save();
    return res.status(201).json({
      status: "Ops Admin Added Successfully",
      message: {
        newOps,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Registration",
      message: err.message,
    });
  }
};

//######################## login HR ###########################//
export const loginOps = async (req, res) => {
  try {
    const { opsemail, opsmobile, opspassword } = req.body;
    let user;
    if (opsemail) {
      user = await OpsAdmin.findOne({ opsemail });
    } else if (opsmobile) {
      user = await OpsAdmin.findOne({ opsmobile });
    }

    if (!user) {
      return res.status(401).json({
        message: "ops Admin Not Found",
      });
    }

    // Simple password check
    // const isValidPassword = await bcrypt.compare(hrpassword, user.hrpassword);
    if (opspassword !== user.opspassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
      });
    }

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
      message: "Login Successfully!",
      token,
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};