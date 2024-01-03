import express from "express";
const router = express.Router();
import routes from "./user_routes/usersRoutes.js";
import {loginAdmin, adminRegister } from "../controller/login.controller.js";
import { addbranchRegister, viewBranch,deleteBranch } from "../controller/addbranch.controller.js";
import {addempRegister, deleteEmployee, viewEmployee} from "../controller/addemp.controller.js";
import {addsalaryController, deleteSalary, empList, viewSalary}from  "../controller/addsalary.controller.js";
import { addpolicyRegister, deletePolicy, viewPolicy } from "../controller/addpolicy.controller.js";
// import { salaryList } from "../controller/gensalary.controller.js";
import uploadFile from "../middleware/fileUpload.js";
import { deleteGenSalary, salaryList } from "../controller/gensalary.controller.js";
import { loginBranch } from "../controller/branch.controller.js";
import { addCompany, deleteCompany, viewCompanies, viewHealthInsuranceCompanies, viewMotorInsuranceCompanies, viewNonMotorInsuranceCompanies } from "../controller/addcompany.controller.js";


// users Routes
router.use("/users", routes);


// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);

// add or view branch
router.post("/dashboard/addbranch", addbranchRegister);
router.get("/api/branch-list", viewBranch);
router.delete("/dashboard/api/:id", deleteBranch);
// COMPANY
router.post("/dashboard/addcompany", uploadFile, addCompany);
router.get("/api/company/company-list", viewCompanies);
router.get("/api/company/health-list", viewHealthInsuranceCompanies);
router.get("/api/company/motor-list", viewMotorInsuranceCompanies);
router.get("/api/company/nonmotor-list", viewNonMotorInsuranceCompanies);
router.delete("/company/api/:id", deleteCompany);


// add or view employee
router.post("/dashboard/addemployee", uploadFile, addempRegister);
router.get("/api/employee-list", viewEmployee);
router.delete("/emp/api/:id", deleteEmployee);
// add or view salary
router.post("/dashboard/addsalary", addsalaryController);
router.get("/api/salary-list", viewSalary);
router.delete("/salary/api/:id", deleteSalary);
// for add salary
router.get("/api/salary-lists", salaryList);
router.delete("/salaries/api/:id", deleteGenSalary);
// add policy
router.post("/dashboard/addpolicy",uploadFile, addpolicyRegister);
router.get("/api/policy-list", viewPolicy);
router.delete("/policies/api/:id", deletePolicy);

// employee list api for add salary
router.get("/api/employee-lists", empList);



// login Branch using Addbranch database
router.post("/branches/loginbranch", loginBranch);





export default router;
