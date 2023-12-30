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
        comp_category,
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
