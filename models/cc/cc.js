import Mongoose from "mongoose";
const CCSchema = new Mongoose.Schema(
  {
    cc: {
      type: Number,
       required: true,
    },
  },
  { timestamps: true }
);

const CC = Mongoose.model("CC", CCSchema);
export default CC;
