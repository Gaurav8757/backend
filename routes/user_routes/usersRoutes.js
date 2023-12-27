import express from "express";
import uploadFile from "../../middleware/fileUpload.js";
import {claimAdded, viewClaim} from "../../controller/user_controller/userclaim.controller.js";
import { userComplaint, viewComplaint } from "../../controller/user_controller/usercomplaint.controller.js";
import { userContact, viewContacts } from "../../controller/user_controller/contact.controller.js";
import { userFeedback,viewFeedback } from "../../controller/user_controller/feedback.controller.js";

const router = express.Router();



// add claim
router.post("/claim", claimAdded);
// view lists
router.get("/viewclaim", viewClaim);
// add complaint
router.post("/complaint", userComplaint);
// view lists
router.get("/viewcomplaint", viewComplaint);
// add feedback
router.post("/feedback", uploadFile, userFeedback);
// view all feedback
router.get("/viewfeedback", viewFeedback);
// CONTACT
router.post("/contactus", userContact);
// views lists
router.get("/viewcontact", viewContacts);



export default router;