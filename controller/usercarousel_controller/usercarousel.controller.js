import UserCarousel from "../../models/user_carousel/usercarouselSchema.js";

export const firstUserCarousel = async (req, res) => {
    try {
      const {
        usercarousel_title,
        usercarousel_desc,
        usercarousel_link,
        usercarousel_upload
      } = req.body;
      // Check if a file is provided in the request
      const uploadfile =
        req.files["usercarousel_upload"] && req.files["usercarousel_upload"][0]
          ? "/src/admin/uploads/" + req.files["usercarousel_upload"][0].filename
          : null;
  
      // Check if the carousel with the given carousellink already exists
      const linkExist = await UserCarousel.findOne({ usercarousel_link });
      if (linkExist) {
        return res.status(400).json({
          status: "Carousel Already Exists",
          message: "This Carousel already exists.",
        });
      }
      // Create a new carousel
      const newCarousel = new UserCarousel({
        usercarousel_title,
        usercarousel_desc,
        usercarousel_link,
        usercarousel_upload: uploadfile,
       
      });
      // Save the new carousel to the database
      await newCarousel.save();
      return res.status(201).json({
        status: "Carousel Submitted Successfully!",
        message: {
            newCarousel,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "Error during Carousel ..!",
        message: err.message,
      });
    }
  };
  // ************************* view carousel lists ************************* //
  export const firstUserCarouselList = async (req, res) => {
    const CarouselList = await UserCarousel.find({});
    if (!CarouselList) {
      return res.status(400).json({
        status: "Error during Carousel lists Update",
        message: "Invalid Carousel selected",
      });
    }
    else {
      return res.status(200).json(CarouselList);
    }
  };
  
// delete carousel
  export const deleteCarousel= async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedCarousel = await UserCarousel.findByIdAndDelete(userId);
      if (!deletedCarousel ) {
        return res.status(404).json({ message: "Carousel not found" });
      }
      return res.json({ message: "Carousel deleted successfully", deletedCarousel});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };