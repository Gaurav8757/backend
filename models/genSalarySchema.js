import Mongoose from "mongoose";
const GenPolicySchema = new Mongoose.Schema(
  {
    empName: {
      type: String,
      ref: "AddSalary",
      required: true,
    },
    monthsalary: {
      type: Number,
      ref: "AddSalary",
      required: true,
    },
    empid: {
      type: String,
      ref: "AddSalary",
      required: true,
    },
    empdesignation: {
      type: String,
      ref: "AddSalary",
      // required: true,
    },
    empbranch: {
      type: String,
      ref: "AddSalary",
      required: true,
    },
    location:{
      type: String
    },
    accNum:{
      type: Number,
      ref: "AddSalary",
      // required:true
    },
    monthleave: {
      type: Number,
      ref: "AddSalary",
      default: 0,
      required: true,
    },
    genMonths: {
      type: String,
    },

    totalDays: {
      type: Number,
      // required: true,
    },
    presentDays: {
      type: Number,
      // required: true,
    },
    totalHalfDays: {
      type: Number,
      // required: true,
    },
    totalAbsent: {
      type: Number,
      // required: true,
    },
    genSalary: {
      type: Number,
      // required: true,
    },
    incentive: {
      type: Number,
      // required: true,
    },
    totalAmount: {
      type: Number,
      // required: true,
    },
    
    empgrossSalary: {
        type: Number,
        // required: true,
      },
      empbasicSalary: {
        type: Number,
        // required: true,
      },
      emphra: {
        type: Number,
        // required: true,
      },
      empca: {
        type: Number,
        // required: true,
      },
      empmedical: {
        type: Number,
        // required: true,
      },
      emptiffin: {
        type: Number,
        // required: true,
      },

      empcompanyPf: {
        type: Number,
        // required: true,
      },
      emppf: {
        type: Number,
        // required: true,
      },
      empesi: {
        type: Number,
        // required: true,
      },
      emploanemi: {
        type: Number,
        // required: true,
      },
  },
  { timestamps: true }
);

const Genpolicy = Mongoose.model("Genpolicy", GenPolicySchema);
export default Genpolicy;
