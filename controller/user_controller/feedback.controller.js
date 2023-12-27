import UserFeedback from "../../models/user_models/userfeedbackSchema.js";

export const userFeedback = async (req, res) => {
    try {
      const {
        feedbackuser_name,
        feedbackuser_email,
        feedbackuser_mobile,
        feedbackuser_query,
        feedbackuser_upload,
       
      } = req.body;
  
      // Check if the branch with the given branchcode already exists
      const emailExist = await UserFeedback.findOne({feedbackuser_email});
      if (emailExist) {
        return res.status(400).json({
          status: "Feedback Already Exists",
          message: "This feedback already exists.",
        });
      }
//   console.log(emailExist);
      // Create a new branch
      const newComplaint = new UserFeedback({
        feedbackuser_name,
        feedbackuser_email,
        feedbackuser_mobile,
        feedbackuser_query,
        feedbackuser_upload,
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

