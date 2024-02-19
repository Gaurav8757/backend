import Mongoose from "mongoose";
const PolicyTypeSchema = new Mongoose.Schema(
  {
    p_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PolicyStaffType = Mongoose.model("PolicyType", PolicyTypeSchema);
export default PolicyStaffType;
