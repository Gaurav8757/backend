import express from "express";

import { createAllInsurance } from "../../controller/masterdetails/masterdetails.controller.js";

const m_details_routes = express.Router();

m_details_routes.post('/adddata', createAllInsurance );


export default m_details_routes;