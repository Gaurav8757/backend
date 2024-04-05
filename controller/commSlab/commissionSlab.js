import VehicleSlab from "../../models/commSlab/vehiclesslab.js";

export const cvehicleSlab = async (req, res) => {
  try {
    const {
      advisorId,
      advisorName,
      advisorUniqueId,
      
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
    console.error("Error fetching VehicleSlabs:", error);
    return res.status(500).json({ error: "Failed to fetch CV-VehicleSlab" });
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
