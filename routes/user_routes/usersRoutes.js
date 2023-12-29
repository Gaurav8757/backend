import express from "express";
import uploadFile from "../../middleware/fileUpload.js";
import {claimAdded, viewClaim, deleteClaim} from "../../controller/user_controller/userclaim.controller.js";
import { deleteComplaint, userComplaint, viewComplaint } from "../../controller/user_controller/usercomplaint.controller.js";
import { userContact, viewContacts } from "../../controller/user_controller/contact.controller.js";
import { userFeedback,viewFeedback, deleteFeedback } from "../../controller/user_controller/feedback.controller.js";

const router = express.Router();



// add claim
router.post("/claim", claimAdded);
// view lists
router.get("/viewclaim", viewClaim);
// delete list of claim
router.delete("/deleteclaim/:id", deleteClaim);

// add complaint
router.post("/complaint", userComplaint);
// view lists
router.get("/viewcomplaint", viewComplaint);
// delete list of complaint
router.delete("/deletecomplaint/:id", deleteComplaint);
// add feedback
router.post("/feedback", uploadFile, userFeedback);
// view all feedback
router.get("/viewfeedback", viewFeedback);
// delete list of feedback
router.delete("/deletefeedback/:id", deleteFeedback);
// CONTACT
router.post("/contactus", userContact);
// views lists
router.get("/viewcontact", viewContacts);



export default router;