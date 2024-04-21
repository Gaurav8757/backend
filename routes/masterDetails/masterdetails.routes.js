import express from "express";
import {
  createAllInsurance,
  viewAllList,
  deleteAllList,
  updateMasterDetails,
  viewHajipurList, 
  viewPolicyBasedonId
} from "../../controller/masterdetails/masterdetails.controller.js";

const m_details_routes = express.Router();
// add
m_details_routes.post("/adddata", createAllInsurance);

// update
m_details_routes.put("/updatedata/:id", updateMasterDetails);

// view
m_details_routes.get("/viewdata", viewAllList);

m_details_routes.get("/viewdata/branch/hpur", viewHajipurList);
// view
m_details_routes.get("/viewdata/:employee_id", viewPolicyBasedonId);

// delete
m_details_routes.delete("/deletedata/:id", deleteAllList);

// lists advisor policy lists based on its id and name

export default m_details_routes;
