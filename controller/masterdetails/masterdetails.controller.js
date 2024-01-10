// insurancePolicyController.js
import AllInsurance from "../../models/masterDetails/masterdetailSchema.js";

export const createAllInsurance = async (req, res) => {
  try {
    const newInsurance = new AllInsurance(req.body);
    const savedInsurance = await newInsurance.save();
    res.status(201).json(savedInsurance);
  } catch (error) {
    console.error('Error creating insurance policy:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
