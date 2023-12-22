import AddBranch from '../models/addbranchSchema.js'; // Replace with the actual path to your AdminLogin model
import { generateUniqueId } from "../controller/generateId.js"; // Replace with the actual path to your unique ID generator function

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

// views all branch

