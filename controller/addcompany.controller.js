import AddCompanies from "../models/addcompanySchema.js";
// adding to db
export const addCompany = async (req, res) => {
    try {
      const { comp_insurance, comp_category, comp_establishment, comp_cname } = req.body;
      
      // Check if a file is provided in the request
      const comp_cfiles =
        req.files && req.files["comp_cfiles"] && req.files["comp_cfiles"][0]
          ? "/src/admin/uploads/" + req.files["comp_cfiles"][0].filename
          : null;
    
      // Create a new company instance
      const addNewCompany = new AddCompanies({
        comp_insurance,
        comp_category: comp_category || "def",
        comp_establishment,
        comp_cname,
        comp_cfiles,
      });
  
      // Save the company to the database
      await addNewCompany.save();
  
      return res.status(201).json({
        status: "Company Added Successfully!",
        message: {
          addNewCompany,
          // Include the list of employees in the response
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "Error during Company Add to db",
        message: err.message,
      });
    }
}


//   VIEW COMPANY LISTS
// ************************* view plicylist ************************* //
export const viewCompany = async (req, res) => {
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
    const HealthInsuranceList = await AddCompanies.find({ comp_insurance: "Health Insurance" });
    return res.status(200).json(HealthInsuranceList);
  } catch (err) {
    return res.status(500).json({
      status: "Error during Health Insurance CompanyList Update",
      message: err.message,
    });
  }
};


// New API for Motor Insurance
export const viewMotorInsuranceCompanies = async (req, res) => {
  try {
    const MotorInsuranceList = await AddCompanies.find({ comp_insurance: "Motor Insurance" });
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
    const NonMotorInsuranceList = await AddCompanies.find({ comp_insurance: "Non-motor Insurance" });
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
