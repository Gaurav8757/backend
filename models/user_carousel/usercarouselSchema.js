import Mongoose from "mongoose";
const UserCarouselSchema = new Mongoose.Schema(
  {
    usercarousel_title: {
      type: String,
      required: true,
    },
    usercarousel_desc: {
      type: String,
      required: true,
    },
    usercarousel_link: {
      type: String,
      required: true,
    },
    usercarousel_upload: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

const UserCarousel = Mongoose.model("UserCarousel", UserCarouselSchema);
export default UserCarousel;
