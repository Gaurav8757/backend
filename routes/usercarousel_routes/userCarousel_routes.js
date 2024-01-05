import express from "express";
import uploadFile from "../../middleware/fileUpload.js";
import { firstUserCarousel, firstUserCarouselList } from "../../controller/usercarousel_controller/usercarousel.controller.js";

const router1 = express.Router();




// add carousel
router1.post("/carousel", uploadFile ,firstUserCarousel);


// view carousel lists
router1.get("/view", firstUserCarouselList);


export default router1;