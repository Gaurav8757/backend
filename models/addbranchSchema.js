import Mongoose from "mongoose";
const AddBranchSchema = new Mongoose.Schema(
  {

    branchid: {
        type: String,
        unique:true,
        required:true,
    },
    concernperson: {
        type: String,
        required: true,
      },
    branchname: {
      type: String,
      required: true,
    },
    branchcode: {
        type: String,
        required:true,
    },
    branchemail: {
        unique: true,
      type: String,
      required: true,
    },
    branchmobile: {
      type: Number,
      required: true,

    },
    branchphone: {
      type: Number,
      unique: true,
      
    },
    branchaddress: {
      type: String,
      required:true,
    },
    branchdistrict: {
        type: String,
        required:true,
      },
      branchstate: {
        type: String,
        required:true,
      },
    branchpincode: {
      type: Number,
       required: true,
    },
  },
  { timestamps: true }
);

const AddBranch = Mongoose.model("AddBranch", AddBranchSchema);
export default AddBranch;
