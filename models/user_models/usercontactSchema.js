import Mongoose from "mongoose";
const UserContactSchema = new Mongoose.Schema(
  {
    usercontact_email: {
      type: String,
      required: true,
    },
    usercontact_mobile: {
      type: Number,
      required: true,
    },
    feedbackuser_query: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const UserContact = Mongoose.model("UserContact", UserContactSchema);
export default UserContact;
