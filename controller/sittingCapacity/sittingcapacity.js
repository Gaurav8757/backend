import SittingCapacity from "../../models/sittingcapacity/sittingCapacity.js";
// add staff
export const addSitCapacities = async (req, res) => {
  try {
    const { sitcapacity } = req.body;
    // Create a new branch
    const newSit = new SittingCapacity({
        sitcapacity,
    });
    // Save the new branch to the database
    await newSit.save();
    return res.status(201).json({
      status: "Sitting Capacity Added Successfully!",
      message: {
        newSit,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Submit..!",
      message: err.message,
    });
  }
};

// lists of staff type
export const viewSitCapacityList = async (req, res) =>{
    try {
        const sitCapacity = await SittingCapacity.find({});
        if (!sitCapacity) {
            return res.status(400).json({
              status: "Error during sitCapacity lists Update",
              message: "Invalid sitCapacity selected",
            });
          }else{
            return res.status(200).json(sitCapacity);
          }
    } catch (error) {
        return res.status(400).json({
            status: "Error during View..!",
            message: error.message,
          });
    }
}

// delete sitting capacity
export const deleteSitting = async (req, res) => {
    try {
      const sitId = req.params.id;
      const deletedSit = await SittingCapacity.findByIdAndDelete(sitId);
      if (!deletedSit) {
        return res.status(404).json({ message: "Sitting Capacity not found" });
      }
      return res.json({ message: "Sitting Capacity deleted successfully", deletedSit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };