import GenSalary from "../models/genSalarySchema.js";

export const genSalaryController = async (req, res) => {
  try {
    const {
      empid,
      empdesignation,
      empbranch,
      location,
      accNum,
      empName,
      monthsalary,
      monthleave,
      totalDays,
      presentDays,
      totalHalfDays,
      totalAbsent,
      genSalary,
      genMonths,
      incentive,
      empgrossSalary,
      empbasicSalary,
      emphra,
      empca,
      empmedical,
      emptiffin,
      empcompanyPf,
      emppf,
      empesi,
      emploanemi,
      totalAmount,
    } = req.body;
    // Create a new salary instance
    const genNewSalary = new GenSalary({
      empid,
      empdesignation,
      empbranch,
      location,
      accNum,
      empName: empName.toString(),
      monthsalary,
      monthleave,
      totalDays,
      presentDays,
      totalHalfDays,
      totalAbsent,
      genSalary,
      genMonths,
      incentive,
      
      empgrossSalary,
      empbasicSalary,
      emphra,
      empca,
      empmedical,
      emptiffin,
      empcompanyPf,
      emppf,
      empesi,
      emploanemi,
      totalAmount,
    });
    // Save the salary to the database
    await genNewSalary .save();
    return res.status(201).json({
      status: "Salary Generated Successfully",
      message: {
        genNewSalary ,
        // Include the list of salary in the response
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Salary Update",
      message: err.message,
    });
  }
};



// LISTS
export const salaryList = async (req, res) => {
  const salariesList = await GenSalary.find({});
  if (!salariesList) {
    return res.status(400).json({
      status: "Error during Salary Update",
      message: "Invalid Salary selected",
    });
  } else {
    return res.status(200).json(salariesList);
  }
};

// update salary
export const updateGenSalary = async (req, res) => {
  try {
    const gensalaryId = req.params.id;
    const gensalaryData = req.body;

    // Check if the Gen Salary exists before attempting to update
    const existingGensalary = await GenSalary.findById(gensalaryId);

    if (!existingGensalary) {
      return res.status(404).json({
        status: "Gen Salary not found",
        message: "The specified Gen Salary ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedGenSalary = await GenSalary.findByIdAndUpdate(
      gensalaryId,
      gensalaryData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Salary Generate Updated Successfully!",
      message: {
        updatedGenSalary
      },
    });
  } catch (err) {
    console.error("Error during Salary Generate:", err);

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










// ************************* view salarylist ************************* //
export const viewGenList = async (req, res) => {
  const SalaryList = await GenSalary.find({});
  if (!SalaryList) {
    return res.status(400).json({
      status: "Error during salary lists Update",
      message: "Invalid salary selected",
    });
  } else {
    return res.status(200).json(SalaryList);
  }
};

//  delete genSalary controller
export const deleteGenSalary = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await GenSalary.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Salary deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
