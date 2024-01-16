// insurancePolicyController.js
import AllInsurance from "../../models/masterDetails/masterdetailSchema.js";

export const createAllInsurance = async (req, res) => {
  
  try {
    const {entryDate,
      company,
      category,
      segment,
      sourcing,
      policyNo,
      insuredName,
      contactNo,
      vehRegNo,
      policyStartDate,
      policyEndDate,
      odExpiry,
      tpExpiry,
      idv,
      bodyType,
      makeModel,
      mfgYear,
      registrationDate,
      vehicleAge,
      fuel,
      gvw,
      cc,
      engNo,
      chsNo,
      policyType,
      productCode,
      odPremium,
      liabilityPremium,
      netPremium,
      finalEntryFields,
      odDiscount,
      ncb,
      advisorName,
      subAdvisor,
      policyMadeBy,
      branch,
      payoutOn,
      taxes,
      policyPaymentMode,
      paymentDoneBy,
      chqNoRefNo,
      bankName,
      chqPaymentDate,
      chqStatus,
      advisorPayableAmount,
      branchPayout,
      branchPayableAmount,
      companyPayout,
      profitLoss,
      } = req.body;

    const newInsurance = new AllInsurance({
      entryDate,
      company,
      category,
      segment,
      sourcing,
      policyNo,
      insuredName,
      contactNo,
      vehRegNo,
      policyStartDate,
      policyEndDate,
      odExpiry,
      tpExpiry,
      idv,
      bodyType,
      makeModel,
      mfgYear,
      registrationDate,
      vehicleAge,
      fuel,
      gvw,
      cc,
      engNo,
      chsNo,
      policyType,
      productCode,
      odPremium,
      liabilityPremium,
      netPremium,
      finalEntryFields,
      odDiscount,
      ncb,
      advisorName,
      subAdvisor,
      policyMadeBy,
      branch,
      payoutOn,
      taxes,
      policyPaymentMode,
      paymentDoneBy,
      chqNoRefNo,
      bankName,
      chqPaymentDate,
      chqStatus,
      advisorPayableAmount,
      branchPayout,
      branchPayableAmount,
      companyPayout,
      profitLoss,
      });
  
      // Save the company to the database
      await newInsurance.save();
      return res.status(201).json({
        status: "All Details Added Successfully!",
        message: {
          newInsurance,
        },
      });
    
  } catch (error) {
    console.error('Error creating insurance policy:', error);
    res.status(500).json({ error: 'Internal Server Error', error});
  }
};


// view lists
export const viewAllList= async (req, res) => {
  const allList = await AllInsurance.find({});
  if (!allList) {
   return res.status(400).json({
     status: "Error during view lists Update",
     message: "Invalid view list selected",
   });
 }else{
   return res.status(200).json(allList);
 }
}

// delete
//  delete branch controller
export const deleteAllList = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const deletedAllInsurance = await AllInsurance.findByIdAndDelete(userId);
    if (!deletedAllInsurance) {
      return res.status(404).json({ message: "AllInsurance not found" });
    }
    return res.json({ message: "AllInsurance deleted successfully", deletedAllInsurance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};