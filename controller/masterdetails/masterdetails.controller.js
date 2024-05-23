// insurancePolicyController.js
import AllInsurance from "../../models/masterDetails/masterdetailSchema.js";
import { Counter } from "../../models/masterDetails/masterdetailSchema.js";


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
      advId,
      sitcapacity,
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
      sitcapacity,
      category,
      advId,
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


// export const updateMasterDetails = async (req, res) => {
//   try {
//     const { policyRefNo } = req.query; // Destructure policyRefNo from query string

//     // Fetch the existing insurance details
//     const existingDetails = await AllInsurance.findOne({ policyRefNo });

//     // If no existing document found, return 404
//     if (!existingDetails) {
//       return res.status(404).json({
//         status: "Error",
//         message: "Insurance Details not found",
//       });
//     }

//     // Perform the update
//     Object.assign(existingDetails, req.body); // Update existingDetails with req.body fields
//     const updatedDetails = await existingDetails.save();

//     // Return updated document
//     return res.status(200).json({
//       status: "Success",
//       message: "Policy Updated Successfully",
//       data: updatedDetails, // Updated details
//     });
//   } catch (error) {
//     console.error("Error updating insurance details:", error);

//     // Handle Mongoose validation errors
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         status: "Error",
//         message: error.message,
//       });
//     }

//     // Internal server error
//     return res.status(500).json({
//       status: "Error",
//       message: "Internal Server Error",
//     });
//   }
// };




// export const getMasterDetails = async (req, res) => {
//   const { policyrefno } = req.query;
//   console.log(policyrefno);
//   try {
//       const policyBasedonId = await AllInsurance.find({ policyrefno });
//       if (policyBasedonId.length === 0) {
//           return res.status(404).json({
//               status: "Error during view lists Update",
//               message: "No records found for the provided policyrefno",
//           });
//       } else {
//           return res.status(200).json(policyBasedonId);
//       }
//   } catch (error) {
//       console.error("Error fetching insurance details:", error);
//       return res.status(500).json({
//           status: "Error",
//           message: "Internal Server Error",
//       });
//   }
// };



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


export const viewAdvisorListing = async (req, res) => {
  const { advisorName } = req.query;
  try {
    const allList = await AllInsurance.aggregate([
      {
        $match: {
          advisorName: advisorName // Filter documents where advisorname matches adv_id
        }
      },
      {
        $lookup: {
          from: "advisors", // Name of the advisors collection
          localField: "advisorname", // Field in the insurance collection
          foreignField: "advisorName", // Field in the advisors collection
          as: "allpolicyemployee" // Name of the field to store the advisor details
        }
      }
    ]);
    if (allList.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No lists found for the given advisor ID"
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





export const viewAllList = async (req, res) => {
  let { page, limit=1000 } = req.query; // Default page: 1, Default limit: 20
  try {
    page = parseInt(page); // Convert page to integer
    // Check if page is not a valid integer or less than 1
    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid page number"
      });
    }
    const skip = (page - 1) * parseInt(limit); // Calculate the number of documents to skip
    const totalCount = await AllInsurance.countDocuments(); // Count total documents
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

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
      { $sort: { entryDate: -1 } }, // Sort by createdAt field in descending order
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]);

    if (allList.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No lists found for the given employee ID"
      });
    } else {
      return res.status(200).json({ allList, totalPages });
    }
  } catch (error) {
    console.error("Error viewing lists:", error);
    return res.status(500).json({
      status: "Error",
      message: "Internal server error"
    });
  }
};


// export const viewPoliciesList = async (req, res) => {
//   try {
//     const allList = await AllInsurance.find({});

//     if (allList.length === 0) {
//       return res.status(404).json({
//         status: "Error",
//         message: "No policies found"
//       });
//     } else {
//       return res.status(200).json({ allList });
//     }
//   } catch (error) {
//     console.error("Error viewing lists:", error);
//     return res.status(500).json({
//       status: "Error",
//       message: "Internal server error"
//     });
//   }
// };

export const viewPoliciesList = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { fromDate, toDate, advisorName, policyNo, insuredName } = req.query;

   
    // Construct the filter object based on the provided parameters
    const filter = {};
    if (fromDate) filter.entryDate = { $gte: new Date(fromDate) };
    if (toDate) filter.entryDate = { ...filter.entryDate, $lte: new Date(toDate) };
    if (advisorName) filter.advisorName = { $regex: new RegExp(advisorName, 'i') };
    if (policyNo) filter.policyNo = { $regex: new RegExp(policyNo, 'i') };
    if (insuredName) filter.insuredName = { $regex: new RegExp(insuredName, 'i') };

    // Find documents based on the constructed filter
    const allList = await AllInsurance.find(filter);

    if (allList.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No policies found"
      });
    } else {
      return res.status(200).json({ allList });
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
      message: `${deletedAllInsurance.policyrefno} Deleted successfully.....!`,
      deletedAllInsurance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
