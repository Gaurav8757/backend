import mongoose from "mongoose";
import AddSalary from "../models/addsalarySchema.js";
import AddEmployee from "../models/addempSchema.js";
    export const addsalaryController = async (req, res) => {
        try {
          const {empName, salmonth, saleavemonth } = req.body;
          // Create a new salary instance
          const addnewSalary = new AddSalary({
            empName: empName.toString(),
            salmonth,
            saleavemonth,
          });
          // Save the salary to the database
          await addnewSalary.save();
          return res.status(201).json({
            status: "Salary Added Successfully",
            message: {
              addnewSalary,
               // Include the list of employees in the response
            },
          });
        } catch (err) {
          return res.status(400).json({
            status: "Error during Salary Update",
            message: err.message,
          });
        }
      };
// ************************* List of employeelist ************************* //
      export const empList= async (req, res) => {
       const employeeList = await AddEmployee.find({}, "empid empname");
       if (!employeeList) {
        return res.status(400).json({
          status: "Error during Salary Update",
          message: "Invalid employee selected",
        });
      }else{
        return res.status(200).json(employeeList);
      }
    }
       
    