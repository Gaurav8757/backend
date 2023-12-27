import UserComplaint from "../../models/user_models/usercomplaintSchema.js";

export const userComplaint = async (req, res) => {
    try {
      const {
        complaint_name,
        complaint_email,
        complaint_mobile,
        complaint_subject,
        complaint_query,
       
      } = req.body;
  
      // Check if the branch with the given branchcode already exists
      const emailExist = await UserComplaint.findOne({complaint_email});
      if (emailExist) {
        return res.status(400).json({
          status: "User Already Exists",
          message: "This user already exists.",
        });
      }
//   console.log(emailExist);
      // Create a new branch
      const newComplaint = new UserComplaint({
        complaint_name,
        complaint_email,
        complaint_mobile,
        complaint_subject,
        complaint_query,
      });
      // Save the new branch to the database
      await newComplaint.save();
      return res.status(201).json({
        status: "Complaint Submitted Successfully!",
        message: {
            newComplaint
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "Error during Complaint..!",
        message: err.message,
      });
    }
  };

