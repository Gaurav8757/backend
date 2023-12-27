import express from "express";
import {claimAdded, viewClaim} from "../../controller/user_controller/userclaim.controller.js";
import { userComplaint, viewComplaint } from "../../controller/user_controller/usercomplaint.controller.js";
import { userContact } from "../../controller/user_controller/contact.controller.js";
const router = express.Router();



// add claim
router.post("/claim", claimAdded);
// view lists
router.get("/viewclaim", viewClaim);
// add complaint
router.post("/complaint", userComplaint);
// view lists
router.get("/viewcomplaint", viewComplaint);
// CONTACT
router.post("/contactus", userContact);



export default router;