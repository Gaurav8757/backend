import express from "express";
const router = express.Router();
import {loginAdmin, adminRegister } from "../controller/login.controller.js";
import { addbranchRegister } from "../controller/addbranch.controller.js";
import {addempRegister} from "../controller/addemp.controller.js";
import {addsalaryController, empList}from  "../controller/addsalary.controller.js";
import { addpolicyRegister } from "../controller/addpolicy.controller.js";
import uploadFile from "../middleware/fileUpload.js";

// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);
// add branch
router.post("/dashboard/addbranch", addbranchRegister);
// add employee
router.post("/dashboard/addemployee", uploadFile, addempRegister);
// add salary
router.post("/dashboard/addsalary", addsalaryController);
// employee list api
router.get("/api/employee-list", empList);
// add policy
router.post("/dashboard/addpolicy",uploadFile, addpolicyRegister);
export default router;
