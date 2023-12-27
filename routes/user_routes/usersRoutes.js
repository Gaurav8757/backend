import express from "express";
import {claimAdded} from "../../controller/user_controller/userclaim.controller.js";
import { userComplaint } from "../../controller/user_controller/usercomplaint.controller.js";
import { userContact } from "../../controller/user_controller/contact.controller.js";
const router = express.Router();



// add claim
router.post("/claim", claimAdded);
// add complaint
router.post("/complaint", userComplaint);


// CONTACT
router.post("/contactus", userContact);



export default router;