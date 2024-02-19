import PolicyStaffType from "../../models/policytype/addTypePolicy.js";
// add staff
export const PolicystaffTypes = async (req, res) => {
  try {
    const { p_type } = req.body;
    // Create a new branch
    const newStaff = new PolicyStaffType({
      p_type,
    });
    // Save the new branch to the database
    await newStaff.save();
    return res.status(201).json({
      status: "Policy Type Added Successfully!",
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

// lists of staff type
export const PolicystaffList = async (req, res) =>{
    try {
        const staff = await PolicyStaffType.find({});

        if (!staff) {
            return res.status(400).json({
              status: "Error during Policy type lists Update",
              message: "Invalid staff type selected",
            });
          }else{
            return res.status(200).json(staff);
          }
        
    } catch (error) {
        return res.status(400).json({
            status: "Error during View..!",
            message: error.message,
          });
    }
}


// delete staff type
export const PolicydeleteStaff = async (req, res) => {
    try {
      const policyId = req.params.id;
      
      const deletedStaff = await PolicyStaffType.findByIdAndDelete(policyId);
      if (!deletedStaff) {
        return res.status(404).json({ message: "Policy Type not found" });
      }
      return res.json({ message: "Policy Type deleted successfully", deletedStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };