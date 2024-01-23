import express from "express";
const router = express.Router();
import routes from "./user_routes/usersRoutes.js";
import { loginAdmin, adminRegister } from "../controller/login.controller.js";
import {
  addbranchRegister,
  viewBranch,
  deleteBranch,
  updateBranch,
} from "../controller/addbranch.controller.js";
import {
  addempRegister,
  deleteEmployee,
  updateEmployee,
  viewEmployee,
} from "../controller/addemp.controller.js";
import {
  addsalaryController,
  deleteSalary,
  empList,
  updateSalary,
  viewSalary,
} from "../controller/addsalary.controller.js";
import {
  addpolicyRegister,
  deletePolicy,
  viewPolicy,
} from "../controller/addpolicy.controller.js";

import uploadFile from "../middleware/fileUpload.js";
import {
  deleteGenSalary,
  salaryList,
} from "../controller/gensalary.controller.js";
import { loginBranch } from "../controller/branch.controller.js";
import {
  addCompany,
  deleteCompany,
  updateCompany,
  viewCompanies,
  viewHealthInsuranceCompanies,
  viewMotorInsuranceCompanies,
  viewNonMotorInsuranceCompanies,
} from "../controller/addcompany.controller.js";
import m_details_routes from "./masterDetails/masterdetails.routes.js";
import { advisorRegister, deleteAdvisor, loginAdvisor, updateAdvisor, viewAdvisor } from "../controller/advisor/advisor.controller.js";

// users Routes
router.use("/users", routes);
// master routes
router.use("/alldetails", m_details_routes);

// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);

// add or view branch
router.post("/dashboard/addbranch", addbranchRegister);
router.get("/api/branch-list", viewBranch);
router.put("/api/branch/update/:id", updateBranch)
router.delete("/dashboard/api/:id", deleteBranch);
// COMPANY
router.post("/dashboard/addcompany", uploadFile, addCompany);
router.get("/api/company/company-list", viewCompanies);
router.get("/api/company/health-list", viewHealthInsuranceCompanies);
router.get("/api/company/motor-list", viewMotorInsuranceCompanies);
router.get("/api/company/nonmotor-list", viewNonMotorInsuranceCompanies);
router.put("/api/company/updatecomp/:id", uploadFile, updateCompany);
router.delete("/company/api/:id", deleteCompany);

// add or view employee
router.post("/dashboard/addemployee", uploadFile, addempRegister);
router.get("/api/employee-list", viewEmployee);
router.put("/api/emp/update/:id", uploadFile ,updateEmployee);
router.delete("/emp/api/:id", deleteEmployee);


// add or view salary
router.post("/dashboard/addsalary", addsalaryController);
router.get("/api/salary-list", viewSalary);
router.put("/api/salary/update/:id", updateSalary);
router.delete("/salary/api/:id", deleteSalary);
// for add salary
router.get("/api/salary-lists", salaryList);
router.delete("/salaries/api/:id", deleteGenSalary);


// add policy
router.post("/dashboard/addpolicy", uploadFile, addpolicyRegister);
router.get("/api/policy-list", viewPolicy);
router.delete("/policies/api/:id", deletePolicy);

// employee list api for add salary
router.get("/api/employee-lists", empList);


// advisor register 
router.post("/advisor/register", advisorRegister);
router.post("/advisor/login", loginAdvisor);
router.get("/advisor/lists", viewAdvisor);
router.put("/advisor/update/:id", updateAdvisor);
router.delete("/advisor/lists/:id", deleteAdvisor);



// login Branch using Addbranch database
router.post("/branches/loginbranch", loginBranch);

export default router;
