import express from "express";
const letters = express.Router();
import { addUserOfferLetter, OfferLetterList, offersDelete } from  '../../controller/offerletter/offerLetter.controller.js';

letters.post("/add/offer", addUserOfferLetter);
letters.get("/view/offer", OfferLetterList);
letters.delete("/delete/offer/:id", offersDelete);
export default letters;