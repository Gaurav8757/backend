import Mongoose from "mongoose";
const CompanyTypeSchema = new Mongoose.Schema(
  {
    c_type: {
      type: String,
      required: true,
    },
    category: {
      type: [String], // Array of product names
      default: [],    // Default to an empty array
    },
    segment: {
        type: [String], // Array of product names
        default: [],    // Default to an empty array
      },  
  },
  { timestamps: true }
);

const CType = Mongoose.model("CompanyType", CompanyTypeSchema);
export default CType;
