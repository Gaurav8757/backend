import Mongoose from "mongoose";

const CompanyTypeSchema = new Mongoose.Schema(
  {
    c_type: {
      type: String,
      required: true,
    },
    category: [
      {
        category_name: {
          type: String,
          required: true,
        },
        segments: {
          type: [String], // Array of segment names
          default: [],    // Default to an empty array
        },
      },
    ],
  },
  { timestamps: true }
);

const CType = Mongoose.model("CompanyType", CompanyTypeSchema);
export default CType;
