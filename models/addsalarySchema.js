import Mongoose from "mongoose";
const AddSalarySchema = new Mongoose.Schema(
  {
    empName: {
        type: String,
        ref: "AddEmployee",
        required: true,
    },
    salmonth: {
      type: Number,
      required: true,
    },
    saleavemonth: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AddSalary = Mongoose.model("AddSalary", AddSalarySchema);
export default AddSalary;
