import StaffType from "../../models/staffType/staffType.js";
export const staffType = async (req, res) => {
  try {
    const { s_type } = req.body;
    // Create a new branch
    const newStaff = new StaffType({
      s_type,
    });
    // Save the new branch to the database
    await newStaff.save();
    return res.status(201).json({
      status: "Staff Added Successfully!",
      message: {
        newStaff,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Submit..!",
      message: err.message,
    });
  }
};
