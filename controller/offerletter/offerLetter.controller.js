import OfferLetter from "../../models/letter/offerletter.js";
let storedYear = null;
let currentNumber = 1;
// reference No generate data
function generateCodes() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let codes = [];
    const codeFormat = "EIPL/" + currentYear + "/";
    // Check if the current year matches the stored year
    if (currentYear !== storedYear) {
        storedYear = currentYear; // Update stored year
        currentNumber = 1; // Reset the number if the year has changed
    }
    // Generate codes for the current year
    for (let i = currentNumber; i <= currentNumber; i++) {
        let numberPart = i.toString().padStart(4, '0');
        codes.push(codeFormat + numberPart);
    }
    currentNumber += 1; // Increment the number for next call
    return codes;
}

// add details of an user
export const addUserOfferLetter = async (req, res) => {
  try {
    const {
      ofname,
      ofemail,
      ofaddress,
      ofmobile,
      ofdate,
      ofsalaryWords,
      ofdesignation,
      ofgrosalary,
      ofvalidDate,
    } = req.body;
    // Generate a reference number
    const referenceNumber = generateCodes()[0];
    console.log(referenceNumber);
    // Check if the user with the given email already exists
    const emailExist = await OfferLetter.findOne({ ofemail });
    if (emailExist) {
      return res.status(400).json({
        status: "User Already Exists",
        message: "User with this email already exists.",
      });
    }
    // Create a new user
    const newUser = new OfferLetter({
      referenceno: referenceNumber,
      ofname,
      ofsalaryWords,
      ofemail,
      ofaddress,
      ofmobile,
      ofdate,
      ofdesignation,
      ofgrosalary,
      ofvalidDate,
    });
    // Save the new user to the database
    await newUser.save();
    return res.status(201).json({
      status: `${ofname} Offer Letter Added Successfully....!`,
      message: {
        newUser,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during adding data",
      message: err.message,
    });
  }
};

// view all offer letters
export const OfferLetterList = async (req, res) =>{
    try {
        const offer = await OfferLetter.find({});
        if (!offer) {
            return res.status(400).json({
              status: "Error during offer letter lists Update",
              message: "Invalid offer letter selected",
            });
          }else{
            return res.status(200).json(offer);
          }
    } catch (error) {
        return res.status(400).json({
            status: "Error during View Offer Letter..!",
            message: error.message,
          });
    }
}

// delete OFFer LETTER
export const offersDelete = async (req, res) => {
  try {
    const fId = req.params.id;
    
    const deletedOffer = await OfferLetter.findByIdAndDelete(fId);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer Letter not found" });
    }
    return res.json({ message: `${deletedOffer} Offer Letter deleted successfully..!`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" } + error);
  }
};