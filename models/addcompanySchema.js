import Mongoose from "mongoose";
const AddCompanySchema = new Mongoose.Schema(
  {
    insurance: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true,
    },
    establishment: {
      type: String,
      required: true,
    },
    cname: {
      type: String,
      required: true,
    },
    cfiles: {
      type: String,
      required:true,
    },
   
   
  },
  { timestamps: true }
);

const AddCompanies = Mongoose.model("AddCompanies", AddCompanySchema);
export default AddCompanies;