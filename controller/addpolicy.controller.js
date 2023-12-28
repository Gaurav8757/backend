import AddPolicy from "../models/addpolicySchema.js";
// import AddEmployee from "../models/addempSchema.js";
export const addpolicyRegister = async (req, res) => {
  try {
    const { addpolicytype, addpolicytitle, addpolicydesc, addpolicycname } =
      req.body;

    // Check if files are provided in the request
    const addpolicyimage =
      req.files["addpolicyimage"] && req.files["addpolicyimage"][0]
        ? "/uploads/" + req.files["addpolicyimage"][0].filename
        : null;

    const addpolicylogo =
      req.files["addpolicylogo"] && req.files["addpolicylogo"][0]
        ? "/uploads/" + req.files["addpolicylogo"][0].filename
        : null;

    // Create a new employee instance
    const addnewPolicy = new AddPolicy({
      addpolicytype: addpolicytype.toString(),
      addpolicytitle,
      addpolicydesc,
      addpolicyimage,
      addpolicycname,
      addpolicylogo,
    });
    // Save the employee to the database
    await addnewPolicy.save();
    return res.status(201).json({
      status: "Policy Added Successfully",
      message: {
        addnewPolicy,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Registration",
      message: err.message,
    });
  }
};

// ************************* view plicylist ************************* //
export const viewPolicy = async (req, res) => {
  const PolicyList = await AddPolicy.find({});
  if (!PolicyList) {
    return res.status(400).json({
      status: "Error during policy lists Update",
      message: "Invalid policy selected",
    });
  } else {
    return res.status(200).json(PolicyList);
  }
};

 //  delete policy controller
 export const deletePolicy = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedPolicy = await AddPolicy.findByIdAndDelete(userId);
    if (!ddeletedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    return res.json({ message: "Policy deleted successfully", deletedPolicy});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};