
import AddSalary from "../models/addsalarySchema.js";
export const salaryList= async (req, res) => {
    const salariesList = await AddSalary.find({}, "empName salmonth saleavemonth");
    if (!salariesList) {
     return res.status(400).json({
       status: "Error during Salary Update",
       message: "Invalid employee selected",
     });
   }else{
     return res.status(200).json(salariesList);
   }
 }