import ncbAdd from "../../models/ncb/ncb.js";

export const ncbAdds = async (req, res) => {
  try {
    const { ncb } = req.body;
    // Create a new branch
    const types = await ncbAdd.findOne({ ncb });
    if (types) {
      return res.status(400).json({
        status: "NCB Already Exists",
        message: "NCB Already exists....",
      });
    }
    const newod = new ncbAdd({
        ncb,
    });
    // Save the new branch to the database
    await newod.save();
    return res.status(201).json({
      status: `${newod.ncb} Added Successfully.....!`,
      message: {
        newod,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error to Add NCB.....!",
      message: err.message,
    });
  }
};

export const ncbLists = async (req, res) =>{
  try {
      const staff = await ncbAdd.find({});
      if (!staff) {
          return res.status(400).json({
            status: "Error during ncb lists Update",
            message: "Invalid ncb selected",
          });
        }else{
          return res.status(200).json(staff);
        }
  } catch (error) {
      return res.status(400).json({
          status: "Error during ncb View..!",
          message: error.message,
        });
  }
}

export const ncbDelete = async (req, res) => {
  try {
    const ncbId = req.params.id;
    const deletencb = await ncbAdd.findByIdAndDelete(ncbId);
    if (!deletencb) {
      return res.status(404).json({ message: "CC not found" });
    }
    return res.json({ message: `${deletencb.ncb} Deleted Successfully.....!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" } + error);
  }
};