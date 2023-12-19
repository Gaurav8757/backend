import express from "express";
const router = express.Router();
import {loginAdmin, adminRegister } from "../controller/login.controller.js";
import { addbranchRegister } from "../controller/addbranch.controller.js";
// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);

// add branch
router.post("/dashboard/addbranch", addbranchRegister);
export default router;
