import AddCompanies from "../models/addcompanySchema.js";
// adding to db
export const addCompany = async (req, res) => {
    try {
      const { insurance, category, establishment, cname } = req.body;
      
      // Check if a file is provided in the request
      const cfiles =
        req.files && req.files["cfiles"] && req.files["cfiles"][0]
          ? "/src/admin/uploads/" + req.files["cfiles"][0].filename
          : null;
          
          console.log("Request Body:", req.body);
          console.log("Request Files:", req.files);
    
      // Create a new company instance
      const addNewCompany = new AddCompanies({
        insurance,
        category,
        establishment,
        cname,
        cfiles,
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
        status: "Error during Company Update",
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
