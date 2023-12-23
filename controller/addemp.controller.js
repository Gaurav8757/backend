import AddEmployee from "../models/addempSchema.js";
import { generateEmpId } from "./generateId.js";

export const addempRegister = async (req, res) => {
  try {
    const {
      empid,
      empname,
      empemail,
      empmobile,
      empgender,
      empdob,
      empjoiningdate,
      empbranch,
      permanentempaddress,
      currentempaddress,
      empaadharno,
      empdesignation,
    } = req.body;

     // Check if a file is provided in the request
    const empaadharfile = req.files["empaadharfile"][0]
      ? "/src/admin/uploads/" + req.files["empaadharfile"][0].filename
      : null;
      console.log(empaadharfile);
    const empExist = await AddEmployee.findOne({ empid });
    // Check if empExist is not null
    if (empExist) {
      return res.status(400).json({
        status: "Employee Already Exists",
        message: "Employee with the given empid already exists.",
      });
    }
    const uniqueid = generateEmpId();
    // Create a new employee instance
    const addnewEmployee = new AddEmployee({
      empid,
      uniqueid,
      empname,
      empemail,
      empmobile,
      empgender,
      empdob,
      empjoiningdate,
      empbranch,
      permanentempaddress,
      currentempaddress,
      empaadharno,
      empdesignation,
      empaadharfile,
    });

    // Save the employee to the database
    await addnewEmployee.save();

    return res.status(201).json({
      status: "Employee Added Successfully",
      message: {
        addnewEmployee,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Registration",
      message: err.message,
    });
  }
};

//################### views all employees #####################/
export const viewEmployee= async (req, res) => {
  const EmployeeList = await AddEmployee.find({});
  if (!EmployeeList) {
   return res.status(400).json({
     status: "Error during emp lists Update",
     message: "Invalid emp selected",
   });
 }else{
   return res.status(200).json(EmployeeList);
 }
}