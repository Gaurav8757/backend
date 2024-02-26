import Mongoose from "mongoose";
const financeSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirm_password:{
      type: String,
      
    },
    gender: {
      type: String,
    },

   
  },
  { timestamps: true }
);

const FinanceLogin = Mongoose.model("Finance", financeSchema);
export default FinanceLogin;
