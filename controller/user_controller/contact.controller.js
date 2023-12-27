import UserContact from "../../models/user_models/usercontactSchema.js";

export const userContact = async (req, res) => {
    try {
      const {
        usercontact_email,
        usercontact_mobile,
        feedbackuser_query,
       
      } = req.body;
  
      // Check if the branch with the given branchcode already exists
      const emailExist = await UserContact.findOne({usercontact_email});
      if (emailExist) {
        return res.status(400).json({
          status: "Contact Already Exists",
          message: "This contact already exists.",
        });
      }
//   console.log(emailExist);
      // Create a new branch
      const newContact = new UserContact({
        usercontact_email,
        usercontact_mobile,
        feedbackuser_query,
      });
      // Save the new branch to the database
      await newContact.save();
      return res.status(201).json({
        status: "Submitted Successfully!",
        message: {
            newContact
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "Error during Submit..!",
        message: err.message,
      });
    }
  };

// ************************* view lists ************************* //
export const viewContacts = async (req, res) => {
  const contactList = await UserContact.find({});
  if (!contactList) {
    return res.status(400).json({
      status: "Error during contactList  Update",
      message: "Invalid contactList Selected",
    });
  } else {
    return res.status(200).json(contactList);
  }
};