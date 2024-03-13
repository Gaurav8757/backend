import express from "express";
const letters = express.Router();
import { addUserOfferLetter, OfferLetterList } from  '../../controller/offerletter/offerLetter.controller.js';

letters.post("/add/offer", addUserOfferLetter);
letters.get("/view/offer", OfferLetterList);

export default letters;