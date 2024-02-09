import express from "express";

import {
  createAllInsurance,
  viewAllList,
  deleteAllList,
  updateMasterDetails,
  viewHajipurList 
} from "../../controller/masterdetails/masterdetails.controller.js";

const m_details_routes = express.Router();

// add
m_details_routes.post("/adddata/:employeeId", createAllInsurance);

// update
m_details_routes.put("/updatedata/:id", updateMasterDetails);

// view
m_details_routes.get("/viewdata", viewAllList);



m_details_routes.get("/viewdata/branch/hpur", viewHajipurList);
// view
m_details_routes.get("/viewdata/:employee_id", viewAllList);

// delete
m_details_routes.delete("/deletedata/:id", deleteAllList);

export default m_details_routes;
