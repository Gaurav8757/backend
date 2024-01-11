import express from "express";

import {
  createAllInsurance,
  viewAllList,
  deleteAllList
} from "../../controller/masterdetails/masterdetails.controller.js";

const m_details_routes = express.Router();
// add
m_details_routes.post("/adddata", createAllInsurance);
// view
m_details_routes.get("/viewdata", viewAllList);

// delete
m_details_routes.delete("/deletedata/:id", deleteAllList);

export default m_details_routes;
