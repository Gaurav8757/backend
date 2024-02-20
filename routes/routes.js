import express from "express";
const router = express.Router();
import routes from "./user_routes/usersRoutes.js";
import hr from "./hrsalary/hrattend.routes.js"
import { loginAdmin, adminRegister, forgotAdminPassword, adminPasswordReset } from "../controller/login.controller.js";
import {
  addbranchRegister,
  viewBranch,
  deleteBranch,
  updateBranch,
} from "../controller/addbranch.controller.js";
import {
  addempRegister,
  deleteEmployee,
  empPasswordReset,
  forgotEmpPassword,
  listOfEmp,
  loginEmployee,
  updateEmployee,
  viewByIdEmp,
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
  updatePolicy,
  viewPolicy,
} from "../controller/addpolicy.controller.js";

import uploadFile from "../middleware/fileUpload.js";
import {
  deleteGenSalary,
  genSalaryController,
  salaryList,
  updateGenSalary,
} from "../controller/gensalary.controller.js";
import { branchPasswordReset, forgotBranchPassword, loginBranch } from "../controller/branch.controller.js";
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
import { addHrRegister, deleteHr, loginHr, updateHr, viewHr } from "../controller/human_resources/hr.controller.js";
import hrouter from "./hrsalary/hrsalary.routes.js";
import {markAttendance, getEmployeeAttendance} from "../controller/empattendance.controller.js"
import { deleteStaff, staffList, staffType } from "../controller/staff/type.controller.js";
import { addOpsRegister, forgotOpsPassword, loginOps, opsPasswordReset } from "../controller/opsAdmin/opsAdmin.js";
import { HrAdPassReset, HrAdRegister, forgotHrAdminPassword, hrAdminLogin } from "../controller/hradmin/hradmin.controller.js";
import { PolicydeleteStaff, PolicystaffList, PolicystaffTypes, ProductPolicyAdd, ProductPolicyDelete } from "../controller/policytype/addtype.policy.js";

// users Routes
router.use("/users", routes);
// master routes
router.use("/alldetails", m_details_routes);
// hrsalary
router.use("/dashboard", hrouter);


// hr attendance
router.use("/hr", hr);
// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);
router.post("/forgot/admin/pass", forgotAdminPassword);
router.post("/admin/pass/:id/:token", adminPasswordReset);

// add or view branch
router.post("/dashboard/addbranch", addbranchRegister);
router.get("/api/branch-list", viewBranch);
router.put("/api/branch/update/:id", updateBranch)
router.delete("/dashboard/api/:id", deleteBranch);
// password change
router.post("/forgot/branch/pass", forgotBranchPassword);
router.post("/branch/pass/:id/:token", branchPasswordReset);

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
router.post("/login/employee", loginEmployee);

// get all employees details inside hr
router.get("/api/employee-list", viewEmployee);
router.put("/api/emp/update/:id", uploadFile ,updateEmployee);
router.delete("/emp/api/:id", deleteEmployee);
router.get("/api/employee/:empId", viewByIdEmp);
// password change
router.post("/forgot/emp/pass", forgotEmpPassword);
router.post("/emp/pass/:id/:token", empPasswordReset);

// attendace of employee
router.post("/employee/mark/attendance/:employeeId", markAttendance);
router.get("/employee/emp/attendance/:employee_id", getEmployeeAttendance);


// add or view salary
router.post("/dashboard/addsalary", addsalaryController);
router.get("/api/salary-list", viewSalary);
router.put("/api/salary/update/:id", updateSalary);
router.delete("/salary/api/:id", deleteSalary);

// for genrate salary
router.post("/dashboard/gensalary", genSalaryController);
router.get("/api/salaries-list", salaryList);
router.put("/api/salaries/:id", updateGenSalary);
router.delete("/salaries/api/:id", deleteGenSalary);

// add policy
router.post("/dashboard/addpolicy", uploadFile, addpolicyRegister);
router.get("/api/policy-list", viewPolicy);
router.put("/policies/update/:id", updatePolicy);
router.delete("/policies/api/:id", deletePolicy);

// employee list api for add salary
router.get("/api/employee-lists", empList);

// advisor register 
router.post("/advisor/register", advisorRegister);
router.post("/advisor/login", loginAdvisor);
router.get("/advisor/lists", viewAdvisor);
router.put("/advisor/update/:id", uploadFile, updateAdvisor);
router.delete("/advisor/lists/:id", deleteAdvisor);

// login Branch using Addbranch database
router.post("/branches/loginbranch", loginBranch);
// HR ROUTES
router.post("/hr/addhr",uploadFile ,addHrRegister);

// hr admin register
router.post("/hradmin/register", HrAdRegister);
router.post("/hradmin/login", hrAdminLogin);
router.post("/forgot/hradmin/pass", forgotHrAdminPassword);
router.post("/hradmin/pass/:id/:token", HrAdPassReset);


router.post("/hr/login", loginHr);
router.get("/hr/lists", viewHr);
router.put("/hr/update/:id", updateHr);
router.delete("/hr/data/:id", deleteHr);
//
router.get("/hr/staff/type", listOfEmp);

// add staff type
router.post("/add/staff", staffType);
router.get("/staff/lists", staffList);
router.delete("/staff/lists/:id", deleteStaff);

// add staff type
router.post("/add/policy/staff", PolicystaffTypes);
router.get("/staff/policy/lists", PolicystaffList);
router.delete("/policy/staff/:id", PolicydeleteStaff);
router.put("/api/policy/types/:id/products", ProductPolicyAdd);
router.delete("/api/policy/products/:id/delete", ProductPolicyDelete);

// ops Admin
router.post("/ops/register", addOpsRegister);
router.post("/ops/login", loginOps);
// password change
router.post("/forgot/ops/pass", forgotOpsPassword);
router.post("/ops/pass/:id/:token", opsPasswordReset);

export default router;
