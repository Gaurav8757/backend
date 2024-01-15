import AddCompanies from "../models/addcompanySchema.js";

// adding to db
export const addCompany = async (req, res) => {

    try {
      const { comp_insurance, comp_categories, comp_establishment, comp_cname } = req.body;
      // const serverURL = `${req.protocol}://${req.get('host')}`; 
      // Check if a file is provided in the request
      const comp_cfiles =
        req.files && req.files["comp_cfiles"] && req.files["comp_cfiles"][0]
          ? "/src/" + req.files["comp_cfiles"][0].filename
          : null;
  //  console.log(comp_cfiles);
      // Create a new company instance
      const addNewCompany = new AddCompanies({
        comp_insurance,
        comp_categories,
        comp_establishment,
        comp_cname,
        comp_cfiles,
      });
  
      // Save the company to the database
      await addNewCompany.save();
      
      // const avatarPath = `${serverURL}/${comp_cfiles}`; 
      // console.log(serverURL);
      return res.status(201).json({
        status: "Company Added Successfully!",
        message: {
          addNewCompany,
          // Include the list of employees in the response
        },
      });
    } catch (err) {
      console.error('Error during Company Add to db:', err);
      return res.status(500).json({
          status: "Internal Server Error",
          message: err.message,
      });
  }
}


//   VIEW COMPANY LISTS
// ************************* view plicylist ************************* //
export const viewCompanies = async (req, res) => {
  const CompanyList = await AddCompanies.find({});
  if (!CompanyList) {
    return res.status(400).json({
      status: "Error during CompanyList  Update",
      message: "Invalid Company selected",
    });
  } else {
    return res.status(200).json(CompanyList);
  }
};
// filter view list on Health Insurance
export const viewHealthInsuranceCompanies = async (req, res) => {
  try {
    const HealthInsuranceList = await AddCompanies.find({ comp_insurance: "Health Insurance" || "Health insurance" || "health insurance"});
    return res.status(200).json(HealthInsuranceList);
  } catch (err) {
    return res.status(500).json({
      status: "Error during Health Insurance CompanyList Update",
      message: err.message,
    });
  }
};
// filter view list on Family Health Insurance
// export const viewHealthInsuranceCompanies1 = async (req, res) => {
//   try {
//     const HealthInsuranceList1 = await AddCompanies.find({ comp_categories: "Family Health Insurance" || "family Health insurance" || "family health insurance"});
//     return res.status(200).json(HealthInsuranceList1);
//   } catch (err) {
//     return res.status(500).json({
//       status: "Error during Family Health Insurance CompanyList Update",
//       message: err.message,
//     });
//   }
// };


// New API for Motor Insurance
export const viewMotorInsuranceCompanies = async (req, res) => {
  try {
    const MotorInsuranceList = await AddCompanies.find({ comp_insurance: "Motor Insurance" || "Motor insurance" || "motor insurance"});
    return res.status(200).json(MotorInsuranceList);
  } catch (err) {
    return res.status(500).json({
      status: "Error during Motor Insurance CompanyList Update",
      message: err.message,
    });
  }
};


// New API for Non-Motor Insurance
export const viewNonMotorInsuranceCompanies = async (req, res) => {
  try {
    const NonMotorInsuranceList = await AddCompanies.find({ comp_insurance: "Non-motor Insurance" || "Non-Motor Insurance" || "Non-Motor insurance" || "non-Motor Insurance" || "non-motor Insurance" || "non-motor insurance"});
    return res.status(200).json(NonMotorInsuranceList);
  } catch (err) {
    return res.status(500).json({
      status: "Error during Non-Motor Insurance CompanyList Update",
      message: err.message,
    });
  }
};



//  delete employee controller
export const deleteCompany = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedCompany = await AddCompanies.findByIdAndDelete(userId);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.json({
      message: "Company deleted successfully",
      deletedCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
