// insurancePolicyController.js
import AllInsurance from "../../models/masterDetails/masterdetailSchema.js";
import { Counter } from "../../models/masterDetails/masterdetailSchema.js";
// const generatePolicyRefNo = async () => {
//   // Get the current year
//   const currentYear = new Date().getFullYear();

//   try {
//     // Find the count of insurance policies for the current year
//     const count = await AllInsurance.countDocuments({ policyrefno: { $regex: `EIPL/${currentYear}/` } });
// console.log(count);
//     // Generate the new policy number with leading zeros
//     const policyNumber = (count + 1).toString().padStart(5, '0');

//     // Return the formatted policyrefno
//     return `EIPL/${currentYear}/${policyNumber}`;
//   } catch (error) {
//     console.error("Error generating policy reference number:", error);
//     // throw new Error("Failed to generate policy reference number");
//   }
// };
// const policyrefno = await generatePolicyRefNo();


export const createAllInsurance = async (req, res) => {

  try {
     // Find the counter document for the policy reference numbers or create one if it doesn't exist
     let counter = await Counter.findOneAndUpdate(
      { policyrefno: 'autoval' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    let seqId;
    if (!counter) {
      // If counter doesn't exist, create a new one with sequence value 1
      const newCounter = new Counter({ policyrefno: 'autoval', seq: 1 });
      await newCounter.save();
      seqId = 1;
    } else {
      // Use the sequence value from the counter document
      seqId = counter.seq;
    }
 // Generate the five-digit policy number with leading zeros
 const policyNumber = seqId.toString().padStart(6, '0');
       
    const {
      entryDate,
      company,
      states,
      district,
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
      rsa,
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
      advisorPayoutAmount,
      branchPayout,
      branchPayableAmount,
      companyPayout,
      profitLoss,
      hypo,
      staffName,
      staffType,
      employee_id,
      currentTime,
      empTime,
      overallTime,
    } = req.body;

    const newInsurance = new AllInsurance({
      policyrefno: `EIPL/${new Date().getFullYear()}/${policyNumber}`,
      entryDate,
      company,
      category,
      states,
      district,
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
      rsa,
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
      advisorPayoutAmount,
      advisorPayableAmount,
      branchPayout,
      branchPayableAmount,
      companyPayout,
      profitLoss,
      hypo,
      staffName,
      staffType,
      currentTime,
      empTime,
      overallTime,
      employee_id
    });

    // Save the company to the database
    await newInsurance.save();
    return res.status(201).json({
      status: "All Details Added Successfully!",
      message: {
        newInsurance,
      },
    })
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
      status: "Policy Updated Successfully..! ",
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



// // view lists
export const viewPolicyBasedonId = async (req, res) => {
  const { employee_id } = req.params;
  const policyBasedonId = await AllInsurance.find({employee_id});
  if (!policyBasedonId) {
    return res.status(400).json({
      status: "Error during view lists Update",
      message: "Invalid view list selected",
    });
  } else {
    return res.status(200).json(policyBasedonId);
  }
};


// export const viewAllList = async (req, res) => {
//   // const { employee_id } = req.params;
//   try {
//     const allList = await AllInsurance.aggregate([
//       {
//         $lookup: {
//           from: "addemployees", // Name of the employees collection
//           localField: "empname", // Field in the insurance collection
//           foreignField: "employee_id", // Field in the employees collection
//           as: "allpolicyemployee" // Name of the field to store the employee details
//         }
//       }
//     ]);
//     if (allList.length === 0) { // Check if the result is empty
//       return res.status(404).json({
//         status: "Error",
//         message: "No lists found for the given employee ID"
//       });
//     } else {
//       return res.status(200).json(allList);
//     }
//   } catch (error) {
//     console.error("Error viewing lists:", error);
//     return res.status(500).json({
//       status: "Error",
//       message: "Internal server error"
//     });
//   }
// };

// export const viewAllList = async (req, res) => {
//   const { page = 1, limit = 20 } = req.query; // Default page: 1, Default limit: 10
  
//   try {
//     const skip = (page - 1) * limit; // Calculate the number of documents to skip
//     const allList = await AllInsurance.aggregate([
//       {
//         $lookup: {
//           from: "addemployees", // Name of the employees collection
//           localField: "empname", // Field in the insurance collection
//           foreignField: "employee_id", // Field in the employees collection
//           as: "allpolicyemployee" // Name of the field to store the employee details
//         }
//       },
//       { $skip: skip }, // Skip documents based on the page number
//       { $limit: parseInt(limit) } // Limit the number of documents returned per page
//     ]);

//     if (allList.length === 0) { // Check if the result is empty
//       return res.status(404).json({
//         status: "Error",
//         message: "No lists found for the given employee ID"
//       });
//     } else {
//       return res.status(200).json(allList);
//     }
//   } catch (error) {
//     console.error("Error viewing lists:", error);
//     return res.status(500).json({
//       status: "Error",
//       message: "Internal server error"
//     });
//   }
// };

export const viewAllList = async (req, res) => {
  const { page = 1, limit = 20 } = req.query; // Default page: 1, Default limit: 20
  
  try {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const allList = await AllInsurance.aggregate([
      {
        $lookup: {
          from: "addemployees",
          let: { empId: "$empname" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$employee_id", "$$empId"] }
              }
            },
            {
              $project: {
                _id: 0, // Exclude _id field
                employee_id: 1,
                // Add other fields you need
              }
            }
          ],
          as: "allpolicyemployee"
        }
      },
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]);

    if (allList.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No lists found for the given employee ID"
      });
    } else {
      return res.status(200).json(allList);
    }
  } catch (error) {
    console.error("Error viewing lists:", error);
    return res.status(500).json({
      status: "Error",
      message: "Internal server error"
    });
  }
};



// show data on the basis of branch name query
export const viewHajipurList = async (req, res) => {
  const { branch } = req.query;
  // Constructing case-insensitive regex for matching branch name
  const branchRegex = new RegExp(`^${branch}$`, 'i');
  const hajipurList = await AllInsurance.find({
    branch: branchRegex
  });
  
  if (!hajipurList || hajipurList.length === 0) {
    return res.status(400).json({
      status: "Error during view lists Update",
      message: `Invalid view list selected or no lists available for ${branch} branch`,
    });
  } else {
    return res.status(200).json(hajipurList);
  }
};


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
