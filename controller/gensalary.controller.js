
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

 // ************************* view salarylist ************************* //
 export const viewGenList= async (req, res) => {
  const SalaryList = await AddSalary.find({});
  if (!SalaryList) {
   return res.status(400).json({
     status: "Error during salary lists Update",
     message: "Invalid salary selected",
   });
 }else{
   return res.status(200).json(SalaryList);
 }
}