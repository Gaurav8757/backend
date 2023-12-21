import AddPolicy from "../models/addpolicySchema.js";
import AddEmployee from "../models/addempSchema.js";
export const addpolicyRegister = async (req, res) => {
  try {
    const {
        addpolicytype,
        addpolicytitle,
        addpolicydesc,
        addpolicycname,
    } = req.body;

     // Check if files are provided in the request
     const addpolicyimage = req.files["addpolicyimage"] && req.files["addpolicyimage"][0]
     ? "/uploads/" + req.files["addpolicyimage"][0].filename
     : null;

   const addpolicylogo = req.files["addpolicylogo"] && req.files["addpolicylogo"][0]
     ? "/uploads/" + req.files["addpolicylogo"][0].filename
     : null;

    // Create a new employee instance
    const addnewPolicy = new AddPolicy({
        addpolicytype:addpolicytype.toString(),
        addpolicytitle,
        addpolicydesc,
        addpolicyimage,
        addpolicycname,
        addpolicylogo
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
