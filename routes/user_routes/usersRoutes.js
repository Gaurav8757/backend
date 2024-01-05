import express from "express";
import router1 from "../usercarousel_routes/userCarousel_routes.js";
import uploadFile from "../../middleware/fileUpload.js";
import {claimAdded, viewClaim, deleteClaim} from "../../controller/user_controller/userclaim.controller.js";
import { deleteComplaint, userComplaint, viewComplaint } from "../../controller/user_controller/usercomplaint.controller.js";
import { userContact, viewContacts, deleteContact } from "../../controller/user_controller/contact.controller.js";
import { userFeedback,viewFeedback, deleteFeedback, updateFeedback, getActiveUsers} from "../../controller/user_controller/feedback.controller.js";
import { userFillCompanyForm, viewUserFillCompanyForm } from "../../controller/user_controller/compForm.contoller.js";

const router = express.Router();
// carousel router imports
router.use("/first", router1);
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
// active deactive feedback_user button
router.patch('/updatefeedbackstatus/:id', updateFeedback),
// feedback_user = true show only 
router.get('/activeusers', getActiveUsers);
// delete list of feedback
router.delete("/deletefeedback/:id", deleteFeedback);
// CONTACT
router.post("/contactus", userContact);
// views lists
router.get("/viewcontact", viewContacts);
// delete list of contact
router.delete("/deletecontact/:id", deleteContact);
// add user details with company
router.post("/userDetails", userFillCompanyForm);
// view all filled user data
router.get("/view/userDetails", viewUserFillCompanyForm);

export default router;
