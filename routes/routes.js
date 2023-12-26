import express from "express";
const router = express.Router();
import {loginAdmin, adminRegister } from "../controller/login.controller.js";
import { addbranchRegister, viewBranch,deleteBranch } from "../controller/addbranch.controller.js";
import {addempRegister, deleteEmployee, viewEmployee} from "../controller/addemp.controller.js";
import {addsalaryController, deleteSalary, empList, viewSalary}from  "../controller/addsalary.controller.js";
import { addpolicyRegister, deletePolicy, viewPolicy } from "../controller/addpolicy.controller.js";
// import { salaryList } from "../controller/gensalary.controller.js";
import uploadFile from "../middleware/fileUpload.js";
import { salaryList } from "../controller/gensalary.controller.js";
import { loginBranch } from "../controller/branch.controller.js";

// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);

// add or view branch
router.post("/dashboard/addbranch", addbranchRegister);
router.get("/api/branch-list", viewBranch);
router.delete("/dashboard/:id", deleteBranch);

// add or view employee
router.post("/dashboard/addemployee", uploadFile, addempRegister);
router.get("/api/employee-list", viewEmployee);
router.delete("/dashboard/:id", deleteEmployee);
// add or view salary
router.post("/dashboard/addsalary", addsalaryController);
router.get("/api/salary-list", viewSalary);
router.delete("/dashboard/:id", deleteSalary);
// for add salary
router.get("/api/salary-lists", salaryList);

// add policy
router.post("/dashboard/addpolicy",uploadFile, addpolicyRegister);
router.get("/api/policy-list", viewPolicy);
router.delete("/dashboard/:id", deletePolicy);

// employee list api for add salary
router.get("/api/employee-lists", empList);



// login Branch using Addbranch database
router.get("/loginbranch", loginBranch);





export default router;
