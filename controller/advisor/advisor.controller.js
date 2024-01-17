import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Advisor from "../../models/advisor/advisorSchema.js";
dotenv.config();
const { SECRET } = process.env;
// ************************* Advisor ************************* //
export const advisorRegister = async (req, res) => {
  try {
    const { advisorname, advisoremail, advisormobile, advisorpassword } =
      req.body;

    // Check if the user with the given email already exists
    const emailExist = await Advisor.findOne({ advisoremail });
    if (emailExist) {
      return res.status(400).json({
        status: "Advisor Already Exists",
        message: "Advisor with this email already exists.",
      });
    }

    // Create a new user
    const newAdvisor = new Advisor({
      advisorname,
      advisoremail,
      advisormobile,
      advisorpassword,
    });
    // Save the new user to the database
    await newAdvisor.save();

    return res.status(201).json({
      status: "Advisor Registered Successfully",
      message: {
        newAdvisor,
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
export const loginAdvisor = async (req, res) => {
    try {
      const { advisoremail, advisormobile, advisorpassword } = req.body;
  
      let advisory;
      if (advisoremail) advisory = await Advisor.findOne({ advisoremail });
      else if (advisormobile) advisory = await Advisor.findOne({ advisormobile });
 
      if (!advisory) {
        return res.status(401).json({
          message: "Advisor Not Found",
        });
      }
      // Simple password check
      if (advisorpassword !== advisory.advisorpassword) {
        return res.status(400).json({
            message: "Password is Incorrect",
        });
    }
     
    const token = jwt.sign(
        {
            advisorId: advisory._id,
        },
        SECRET,
        {
            expiresIn: "24h",
        }
    );
    return res.status(200).json({
        message: "Login Successful",
        // advisory,
        token,
    })
}
     catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }



//################### views all advisors #####################/
export const viewAdvisor = async (req, res) => {
  const advisorList = await Advisor.find({});
  if (!advisorList) {
    return res.status(400).json({
      status: "Error during advisor lists Update",
      message: "Invalid advisor selected",
    });
  } else {
    return res.status(200).json(advisorList);
  }
};

// Controller function to handle updating specific fields of a advisor
export const updateAdvisor = async (req, res) => {
  try {
    const advisorId = req.params.id;
    const updatedAdvisorData = req.body;

    // Check if the company exists before attempting to update
    const existingAdvisor = await Advisor.findById(advisorId);

    if (!existingAdvisor) {
      return res.status(404).json({
        status: "Advisor not found",
        message: "The specified Advisor ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedAdvisor = await Advisor.findByIdAndUpdate(
      advisorId,
      updatedAdvisorData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Advisor Updated Successfully!",
      message: {
        updatedAdvisor,
      },
    });
  } catch (err) {
    console.error("Error during Advisor Update:", err);
    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};

//################### delete advisors #####################/
export const deleteAdvisor = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedAdvisor = await Advisor.findByIdAndDelete(userId);
    if (!deletedAdvisor) {
      return res.status(404).json({ message: "Advisor not found" });
    }
    return res.json({
      message: "Advisor deleted successfully",
      deletedAdvisor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
