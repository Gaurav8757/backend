import UserContact from "../../models/user_models/usercontactSchema.js";

export const userContact = async (req, res) => {
    try {
      const {
        usercontact_email,
        usercontact_mobile,
        usercontact_query,
       
      } = req.body;
  
      // Create a new branch
      const newContact = new UserContact({
        usercontact_email,
        usercontact_mobile,
        usercontact_query,
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

// delete contacts

export const deleteContact = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const deletedContact = await UserContact.findByIdAndDelete(userId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.json({ message: "Contact deleted successfully", deletedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};