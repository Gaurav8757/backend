import GenSalary from "../models/genSalarySchema.js";

export const genSalaryController = async (req, res) => {
  try {
    const {
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
      totalAmount,
    } = req.body;
    // Create a new salary instance
    const genNewSalary = new GenSalary({
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
      totalAmount,
    });
    // Save the salary to the database
    await genNewSalary .save();
    return res.status(201).json({
      status: "Salary Generated Successfully",
      message: {
        genNewSalary ,
        // Include the list of employees in the response
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
      message: "Invalid employee selected",
    });
  } else {
    return res.status(200).json(salariesList);
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
    return res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
