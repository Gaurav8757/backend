import express from "express";
const router = express.Router();
import {loginAdmin, adminRegister } from "../controller/login.controller.js";
import { addbranchRegister, viewBranch } from "../controller/addbranch.controller.js";
import {addempRegister, viewEmployee} from "../controller/addemp.controller.js";
import {addsalaryController, empList, viewSalary}from  "../controller/addsalary.controller.js";
import { addpolicyRegister, viewPolicy } from "../controller/addpolicy.controller.js";
// import { salaryList } from "../controller/gensalary.controller.js";
import uploadFile from "../middleware/fileUpload.js";
import { salaryList } from "../controller/gensalary.controller.js";

// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);

// add or view branch
router.post("/dashboard/addbranch", addbranchRegister);
router.get("/api/branch-list", viewBranch);

// add or view employee
router.post("/dashboard/addemployee", uploadFile, addempRegister);
router.get("/api/employee-list", viewEmployee);

// add or view salary
router.post("/dashboard/addsalary", addsalaryController);
router.get("/api/salary-list", viewSalary);
// for add salary
router.get("/api/salary-lists", salaryList);

// add policy
router.post("/dashboard/addpolicy",uploadFile, addpolicyRegister);
router.get("/api/policy-list", viewPolicy);


// employee list api for add salary
router.get("/api/employee-lists", empList);


export default router;
