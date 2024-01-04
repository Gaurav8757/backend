import UserFeedback from "../../models/user_models/userfeedbackSchema.js";

export const userFeedback = async (req, res) => {
    try {
      const {
        feedbackuser_name,
        feedbackuser_email,
        feedbackuser_mobile,
        feedbackuser_query,
        feedbackuser_upload, 
        feedbackuser_status
       
      } = req.body;
      // Check if a file is provided in the request
     const uploadfile = req.files["feedbackuser_upload"] && req.files["feedbackuser_upload"][0]
     ? "/src/admin/uploads/" + req.files["feedbackuser_upload"][0].filename
     : null;
   
  
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
        feedbackuser_upload: uploadfile,
        feedbackuser_status,
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
// ************************* view lists ************************* //
export const viewFeedback = async (req, res) => {
  const feedbackList = await UserFeedback.find({});
  if (!feedbackList) {
    return res.status(400).json({
      status: "Error during claim lists Update",
      message: "Invalid claim selected",
    });
  } 
  // if(feedbackList){
  //   const feedbackWithShowStatus = feedbackList.map((feedback) => ({
  //     ...feedback.toObject(),
  //     show: true, // Set the initial show status to false
  //   }));

  //   return res.status(200).json(feedbackWithShowStatus);
  // }
  else {
    return res.status(200).json(feedbackList);
  }
};


//  delete feedback controller
export const deleteFeedback = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedFeedback = await UserFeedback.findByIdAndDelete(userId);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Branch not found" });
    }
    return res.json({ message: "Branch deleted successfully", deletedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};