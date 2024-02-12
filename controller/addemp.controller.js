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
      staffType,
      empdesignation,
    } = req.body;

     // Check if a file is provided in the request
     const empaadharfile = req.files && req.files["empaadharfile"] && req.files["empaadharfile"][0]
     ? "https://eleedomimf.onrender.com/uploads/" + req.files["empaadharfile"][0].filename
     : null;

       // Generate a password
    const emppasswords = generatePassword(empemail);

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
      staffType,
      accNumber,
      ifcs,
      bankName,
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
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}


//################### views all employees #####################/
export const viewEmployee = async (req, res) => {
  try {
    const result = await AddEmployee.aggregate([
      {
        $lookup: {
          from: "empattendances",
          localField: "_id",
          foreignField: "employee_id",
          as: "employeeDetails"
        }
      }
     
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error fetching employee attendance list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//####### list of employee name based on staff type #######/
export const listOfEmp = async (req, res)=>{
  try {
    // Aggregate to group employees by staffType and push empname into an array
    const aggregatedResult = await AddEmployee.aggregate([
        {
            $group: {
                _id: "$staffType",
                empnames: { $push: { _id: "$_id", empname: "$empname" } }
            }
        }
    ]);
    
    if (!aggregatedResult || aggregatedResult.length === 0) {
        return res.status(404).json({
            status: "Error",
            message: "No data found"
        });
    }
    return res.status(200).json(aggregatedResult);
} catch (error) {
    console.error("Error during aggregation:", error);
    return res.status(500).json({
        status: "Error",
        message: "Internal server error"
    });
}
}




//################ update code ########################/
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