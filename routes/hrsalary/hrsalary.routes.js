import express from "express";
const hrouter = express.Router();

import { hrSalaryController, viewHrSalary, updateHRSalary, deleteHRSalary } from "../../controller/human_resources/salaryhr.controller.js";



// add or view branch
hrouter.post("/hr/addsalary", hrSalaryController);
hrouter.get("/hr/viewsalary", viewHrSalary);
hrouter.put("/hr/update/salary/:id", updateHRSalary);
hrouter.delete("/hr/delete/salary/id", deleteHRSalary);


export default hrouter;