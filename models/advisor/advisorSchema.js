import Mongoose from "mongoose";

const AdvisorSchema = new Mongoose.Schema(
  {
    advisorname: {
      type: String,
      required: true,
    },
    uniqueId:{
      type: String,
      required: true,
    },
    advisoraddress:{
      type: String,
      // required: true,
    },
    branch:{
      type: [String],
      required:true
    },
    advisoremail: {
      type: String,
      required: true,
    },
    advisortype:{
      type : String ,
      required: true,
    },

    advisormobile: {
        type: Number,
        // required: true,
      },

    advisorpassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Advisor = Mongoose.model("Advisor", AdvisorSchema);
export default Advisor;
