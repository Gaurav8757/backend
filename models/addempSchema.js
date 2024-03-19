import Mongoose from "mongoose";
const AddEmployeeSchema = new Mongoose.Schema(
  {
    empid: {
      type: String,
      // required: true,
    },
    uniqueid:{
      type: String,
    },
    empname: {
      type: String,
      // required: true,
    },
    emppassword: {
      type: String,
      required: true,
    },
    confirmemp_password: {
      type: String,
    },
    empdob: {
      type: String,
      // required: true,
    },
    empgender: {
      type: String,
      // required: true,
    },
    empemail: {
      unique: true,
      type: String,
      // required: true,
    },
    empmobile: {
      type: Number,
      // required: true,
    },
    empjoiningdate: {
      type: String,
      // required:true,
    },
    empbranch: {
      type: String,
      // required: true,
    },
    permanentempaddress: {
      type: String,
      // required: true,
    },
    currentempaddress: {
      type: String,
      // required: true,
    },
    empaadharno: {
      type: Number,
      // required: true,
    },

    accNumber: {
      type: Number,
      // required: true,
    },
    bankName: {
      type: String,
      // required: true,
    },
    ifsc: {
      type: String,
      
    },
    pan: {
      type: String,
      // required: true,
    },
    panno: {
      type: String,
    },
    empaadharfile: {
      type: String,
      unique: true, // Ensure uniqueness
      sparse: true, // Allow multiple documents to have a null value
      default: "NA"
    },
    staffType:{
      type: String,
      ref: "StaffType",
      // required: true,
    },
    empdesignation: {
      type: String,
      // required: true,
    },
    salary: {
      type: Number,
      // required: true,
    },
    incdate: {
      type: String,
      
    },
    incmoney: {
      type: Number,
      default: 0,
    },
    currDate: {
      type: String,
    },
    leaveDetails: [
      {
        dateRange: {
          startDate: String,
          endDate: String
        },
        reasonForLeave: String
      }
    ],
    terminatedate: {
      type: String,
    },
    leavemonth: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

const AddEmployee = Mongoose.model("AddEmployee", AddEmployeeSchema);
export default AddEmployee;
