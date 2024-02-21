import dotenv from "dotenv";
import Mongoose from "mongoose";
dotenv.config();
const { MONGODB_URI, DB_NAME } = process.env;
const connectDB = async() => {
  try {
    const connectionIns = await Mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, {
      
    });
    console.log(
      `MongoDB connected !! DB Host: ${connectionIns.connection.host}`
    );
  } catch (error) {
    console.log("Mongo connection error", error);
    process.exit(1);
  }
};

export default connectDB;