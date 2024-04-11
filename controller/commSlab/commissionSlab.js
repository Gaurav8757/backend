import VehicleSlab from "../../models/commSlab/vehiclesslab.js";

export const cvehicleSlab = async (req, res) => {
  try {
    const {
      advisorId,
      advisorName,
      advisorUniqueId,
      states,
      districts,
      vehicleSlab,
      cnames,
      segments,
      policytypes,
      pcodes,
      catnames,
      vage,
      vfuels,
      vncb,
      voddiscount,
      vcc,
      payoutons,
      cvpercentage,
      branchpayoutper,
      companypayoutper,
    } = req.body;
    // Create a new VehicleSlab instance
    const newVehicleSlab = new VehicleSlab({
      advisorId,
      advisorName,
      states,
      districts,
      advisorUniqueId,
      vehicleSlab,
      cnames,
      catnames,
      segments,
      policytypes,
      pcodes,
      vage,
      vfuels,
      vncb,
      voddiscount,
      vcc,
      payoutons,
      cvpercentage,
      branchpayoutper,
      companypayoutper,
    });
    // Save the new VehicleSlab document to the database
    await newVehicleSlab.save();
    // Respond with success message
    return res
      .status(201)
      .json({ message: "CV-VehicleSlab saved Successfully...!" });
  } catch (error) {
    // Handle errors
    console.error("Error saving CV-VehicleSlab:", error);
    return res
      .status(500)
      .json({ error: "Failed to save CV-VehicleSlab" + error });
  }
};

// VIEW  ALL DATA OF VEHICLE SLAB
export const viewAllCVehicleSlab = async (req, res) => {
  try {
    // Fetch all VehicleSlab documents from the database
    const vehicleSlabs = await VehicleSlab.find();
    // Respond with the retrieved documents
    return res.status(200).json(vehicleSlabs);
  } catch (error) {
    // Handle errors
    console.error("Error fetching Payout Slab:", error);
    return res.status(500).json({ error: "Failed to fetch Payout Slab" });
  }
};



// UPDATE A VEHICLE SLAB RECORD
export const updateCVehicleSlab = async (req, res) => {
  try {
    const vId = req.params.id;
    const updateDetails = req.body;
    // Check if the insurace lists exists before attempting to update
    const existingDetails = await VehicleSlab.findById(vId);

    if (!existingDetails) {
      return res.status(404).json({
        status: "Payout Slab Details not found",
        message: "The specified Payout ID does not exists in the database",
      });
    }

    // Perform the update
    const updatedDetails = await VehicleSlab.findByIdAndUpdate(
      vId,
      updateDetails,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: "Slab Updated Successfully..! ",
      message: {
        updatedDetails,
      },
    });
  } catch (err) {
    console.error(err);

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "Validation Error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};












// PRIVATE CAR
export const TWvehicleSlab = async (req, res) => {
  try {
    const {
      advisorId,
      advisorName,
      advisorUniqueId,
      vehicleSlab,
      states,
      districts,
      cnames,
      catnames,
      segments,
      policytypes,
      pcodes,
      vage,
      payoutons,
      cvpercentage,
      vfuels,
      vncb,
      voddiscount,
      vcc,
      branchpayoutper,
      companypayoutper,
    } = req.body;
    // Create a new VehicleSlab instance
    const newVehicleSlab = new VehicleSlab({
      advisorId,
      advisorName,
      states,
      districts,
      advisorUniqueId,
      vehicleSlab,
      cnames,
      catnames,
      segments,
      policytypes,
      pcodes,
      vage,
      payoutons,
      cvpercentage,
      vfuels,
      vncb,
      voddiscount,
      vcc,
      branchpayoutper,
      companypayoutper,
    });
    // Save the new VehicleSlab document to the database
    await newVehicleSlab.save();
    // Respond with success message
    return res
      .status(201)
      .json({ message: "TW Commission saved Successfully...!" });
  } catch (error) {
    // Handle errors
    console.error("Error saving TW Slab:", error);
    return res.status(500).json({ error: "Failed to save TW Slab" + error });
  }
};
