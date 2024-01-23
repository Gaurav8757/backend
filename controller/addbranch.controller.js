import AddBranch from '../models/addbranchSchema.js'; // Replace with the actual path to your AdminLogin model
import { generateUniqueId, generatePassword } from "../controller/generateId.js"; // Replace with the actual path to your unique ID generator function

// Function to generate unique ID for branches
const generateBranchId = () => {
  return generateUniqueId(); // You need to have a generateUniqueId function in your code
};

export const addbranchRegister = async (req, res) => {
  try {
    const {
      concernperson,
      branchname,
      branchcode,
      branchemail,
      branchmobile,
      branchphone,
      branchaddress,
      branchdistrict,
      branchstate,
      branchpincode,
    } = req.body;

    // Check if the branch with the given branchcode already exists
    const branchExist = await AddBranch.findOne({ branchcode });
    if (branchExist) {
      return res.status(400).json({
        status: "Branch Already Exists",
        message: "This branch already exists.",
      });
    }

    // Generate a unique branch ID
    const branchid = generateBranchId();
   // Generate a password
 const password = generatePassword(branchemail);
    // Create a new branch
    const addnewBranch = new AddBranch({
      branchid,
      concernperson,
      branchname,
      branchcode,
      branchemail,
      branchmobile,
      branchphone,
      branchaddress,
      branchdistrict,
      branchstate,
      branchpincode,
      password
    });

    // Save the new branch to the database
    await addnewBranch.save();

    return res.status(201).json({
      status: "Branch added Successfully!",
      message: {
        addnewBranch,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during registration",
      message: err.message,
    });
  }
};

//################### views all branchs #####################/
export const viewBranch= async (req, res) => {
    const branchList = await AddBranch.find({});
    if (!branchList) {
     return res.status(400).json({
       status: "Error during branch lists Update",
       message: "Invalid branch selected",
     });
   }else{
     return res.status(200).json(branchList);
   }
 }

// update code 
export const updateBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const branchData = req.body;

    // Check if the contact exists before attempting to update
    const existingBranch = await AddBranch.findById(branchId);

    if (!existingBranch) {
      return res.status(404).json({
        status: "Branch not found",
        message: "The specified Branch ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedBranch = await AddBranch.findByIdAndUpdate(
      branchId,
      branchData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Branch Updated Successfully!",
      message: {
        updatedBranch,
      },
    });
  } catch (err) {
    console.error("Error during Contact Update:", err);

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


//  delete branch controller
export const deleteBranch = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const deletedUser = await AddBranch.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Branch not found" });
    }
    return res.json({ message: "Branch deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};