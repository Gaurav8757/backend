import express from "express";

import {
  createAllInsurance,
  viewAllList,
} from "../../controller/masterdetails/masterdetails.controller.js";

const m_details_routes = express.Router();

m_details_routes.post("/adddata", createAllInsurance);

m_details_routes.get("/viewdata", viewAllList);

export default m_details_routes;
