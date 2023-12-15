import express from "express";
const router = express.Router();
import {loginAdmin, adminRegister } from "../controller/admin.controller.js";
// admin routes
// login
router.post("/loginadmin", loginAdmin);
// register
router.post("/registeradmin", adminRegister);


export default router;
