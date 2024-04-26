import Mongoose from "mongoose";
const ODSchema = new Mongoose.Schema(
  {
    odDiscount: {
      type: String,
       required: true,
    },
  },
  { timestamps: true }
);

const ODDiscount = Mongoose.model("ODDiscount", ODSchema);
export default ODDiscount;
