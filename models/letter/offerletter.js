import Mongoose from "mongoose";
const OfferLetterSchema = new Mongoose.Schema(
  {
    referenceno: {
      type: String,
      required: true,
    },
    ofdate: {
      type: String,
      required: true,
    },
    incdate: {
      type: String,
      required: true,
    },
    ofname: {
      type: String,
      required: true,
    },
    ofaddress: {
      type: String,
      required: true,
    },
    ofemail: {
      type: String,
      required: true,
    },
    ofmobile: {
      type: String,
      required: true,
    },
    ofdesignation: {
      type: String,
      required: true,
    },
    ofgrosalary: {
      type: Number,
      default: 0,
    },
    ofsalaryWords: {
      type: String,
     
    },
    ofvalidDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OfferLetter = Mongoose.model("OfferLetter", OfferLetterSchema);
export default OfferLetter;



const letterSchema = new Mongoose.Schema(
  {
    letterno:{
        type : String,
    },
    sequence:{
      type: Number
    }
  }
)
export const LetterCounter = Mongoose.model("LetterCounter",letterSchema);
