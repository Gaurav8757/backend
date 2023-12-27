import UserFeedback from "../../models/user_models/userfeedbackSchema.js";

export const userFeedback = async (req, res) => {
    try {
      const {
        complaint_name,
        complaint_email,
        complaint_mobile,
        complaint_subject,
        complaint_query,
       
      } = req.body;
  
      // Check if the branch with the given branchcode already exists
      const emailExist = await UserFeedback.findOne({complaint_email});
      if (emailExist) {
        return res.status(400).json({
          status: "Feedback Already Exists",
          message: "This feedback already exists.",
        });
      }
//   console.log(emailExist);
      // Create a new branch
      const newComplaint = new UserFeedback({
        complaint_name,
        complaint_email,
        complaint_mobile,
        complaint_subject,
        complaint_query,
      });
      // Save the new branch to the database
      await newComplaint.save();
      return res.status(201).json({
        status: "Feedback Submitted Successfully!",
        message: {
            newComplaint
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "Error during Feedback..!",
        message: err.message,
      });
    }
  };

