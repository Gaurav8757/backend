import Mongoose from "mongoose";

const VehicleSlabSchema = new Mongoose.Schema(
  {
    VehicleSlab: {
      type: String,
      required: true,
    },
    cnames: {
      type: String,
      // required: true,
    },
    segments: {
        type: String,
        // required: true,
      },
      policytypes: {
        type: String,
        // required: true,
      },
      pcodes: {
        type: String,
        // required: true,
      },
      vage:{
        type: String,
        // required: true,
      },
       payoutons: {
        type: String,
        // required: true,
      },
      cvpercentage:{
        type: Number,
        // required: true,
      },
      vfuels:{
        type: String,
        // required: true,
      },
       vncb: {
        type: Number,
        // required: true,
      },
      voddiscount:{
        type: Number,
        // required: true,
      },
      vcc:{
        type: String,
        // required: true,
      },
  },
  { timestamps: true }
);

const VehicleSlab = Mongoose.model("VehicleSlab", VehicleSlabSchema);
export default VehicleSlab;
