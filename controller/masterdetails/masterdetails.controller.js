// insurancePolicyController.js
import AllInsurance from "../../models/masterDetails/masterdetailSchema.js";

export const createAllInsurance = async (req, res) => {
  try {
    const {
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
      hypo,
      staffName,
      staffType
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
      hypo,
      staffName,
      staffType
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
    console.error("Error creating insurance policy:", error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

// Controller function to handle updating specific fields of a company
export const updateMasterDetails = async (req, res) => {
  try {
    const detailsId = req.params.id;
    const updateDetails = req.body;

    // Check if the insurace lists exists before attempting to update
    const existingDetails = await AllInsurance.findById(detailsId);

    if (!existingDetails) {
      return res.status(404).json({
        status: "Insurance Details not found",
        message: "The specified Insurance ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedDetails = await AllInsurance.findByIdAndUpdate(
      detailsId,
      updateDetails,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: "Insurance Updated Successfully!",
      message: {
        updatedDetails,
      },
    });
  } catch (err) {
    console.error("Error during Insurance Update:", err);

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



// view lists
export const viewAllList = async (req, res) => {
  const { employee_id } = req.params;
  const allList = await AllInsurance.find({});
  if (!allList) {
    return res.status(400).json({
      status: "Error during view lists Update",
      message: "Invalid view list selected",
    });
  } else {
    return res.status(200).json(allList);
  }
};

// delete
//  delete branch controller
export const deleteAllList = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedAllInsurance = await AllInsurance.findByIdAndDelete(userId);
    if (!deletedAllInsurance) {
      return res.status(404).json({ message: "AllInsurance not found" });
    }
    return res.json({
      message: "AllInsurance deleted successfully",
      deletedAllInsurance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
