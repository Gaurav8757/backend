import express from "express";
import {claimAdded} from "../../controller/user_controller/userclaim.controller.js";
const router = express.Router();



// add claim
router.post("/claim", claimAdded);






export default router;