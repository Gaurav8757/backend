import AddEmployee from "../models/addempSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { generateEmpId, generatePassword } from "./generateId.js";
dotenv.config();
const { SECRET } = process.env;

// import bcrypt from "bcryptjs";
export const addempRegister = async (req, res) => {
  try {
    const {
      empid,
      empname,
      empemail,
      empmobile,
      empgender,
      empdob,
      empjoiningdate,
      empbranch,
      permanentempaddress,
      currentempaddress,
      empaadharno,
      empdesignation,
    } = req.body;

     // Check if a file is provided in the request
     const empaadharfile = req.files && req.files["empaadharfile"] && req.files["empaadharfile"][0]
     ? "https://eleedomimf.onrender.com/uploads/" + req.files["empaadharfile"][0].filename
     : null;

       // Generate a password
 const emppasswords = generatePassword(empemail);
    //  encrypt password
    //  const salt = await bcrypt.genSalt(10);
    //  const hashedPassword = await bcrypt.hash(emppasswords, salt);


    const empExist = await AddEmployee.findOne({ empid });
    // Check if empExist is not null
    if (empExist) {
      return res.status(400).json({
        status: "Employee Already Exists",
        message: "Employee with the given empid already exists.",
      });
    }
    const uniqueid = generateEmpId();
    // Create a new employee instance
    const addnewEmployee = new AddEmployee({
      empid,
      uniqueid,
      empname,
      empemail,
      empmobile,
      emppassword: emppasswords,
      empgender,
      empdob,
      empjoiningdate,
      empbranch,
      permanentempaddress,
      currentempaddress,
      empaadharno,
      empdesignation,
      empaadharfile,
    });
    // Save the employee to the database
    await addnewEmployee.save();
    return res.status(201).json({
      status: "Employee Added Successfully",
      message: {
        addnewEmployee,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Registration",
      message: err.message,
    });
  }
};

//######################## login employee ###########################//
export const loginEmployee = async (req, res) => {
  try {
    const { empemail, empmobile, emppassword } = req.body;
    let user;
    if (empemail) {
      user = await AddEmployee.findOne({ empemail });
    } else if (empmobile) {
      user = await AddEmployee.findOne({ empmobile });
    }

    if (!user) {
      return res.status(401).json({
        message: "Employee Not Found",
      });
    }

    // Simple password check
    if (emppassword !== user.emppassword) {
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
      user:{
        empname,
      empemail,
      _id
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}


//################### views all employees #####################/
export const viewEmployee= async (req, res) => {
  const EmployeeList = await AddEmployee.find({});
  if (!EmployeeList) {
   return res.status(400).json({
     status: "Error during emp lists Update",
     message: "Invalid emp selected",
   });
 }else{
   return res.status(200).json(EmployeeList);
 }
}


// update code 
export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;

    // Check if the empoyee exists before attempting to update
    const existingEmployee = await AddEmployee.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({
        status: "Employee not found",
        message: "The specified Employee ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedEmployee = await AddEmployee.findByIdAndUpdate(
      employeeId,
      employeeData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Employee Updated Successfully!",
      message: {
        updatedEmployee,
      },
    });
  } catch (err) {
    console.error("Error during Employee Update:", err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: "Validation Error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};




//  delete employee controller
export const deleteEmployee = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedEmployee = await AddEmployee.findByIdAndDelete(userId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.json({ message: "User deleted successfully", deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};