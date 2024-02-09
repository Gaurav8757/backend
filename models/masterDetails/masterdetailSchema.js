import mongoose from 'mongoose';

const AllInsurancePolicySchema = new mongoose.Schema(
  {
    entryDate: {
      type: String,
    },
    company: {
      type: String,
    },
    category: {
      type: String,
    },
    segment: {
      type: String,
    },
    sourcing: {
      type: String,
    },
    policyNo: {
      type: String,
    },
    insuredName: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    vehRegNo: {
      type: String,
    },
    policyStartDate: {
      type: String,
    },
    policyEndDate: {
      type: String,
    },
    odExpiry: {
      type: String,
    },
    tpExpiry: {
      type: String,
    },
    idv: {
      type: Number,
    },
    bodyType: {
      type: String,
    },
    makeModel: {
      type: String,
    },
    mfgYear: {
      type: Number,
    },
    registrationDate: {
      type: String,
    },
    vehicleAge: {
      type: String,
    },
    fuel: {
      type: String,
    },
    gvw: {
      type: Number,
    },
    cc: {
      type: Number,
    },
    engNo: {
      type: String,
    },
    chsNo: {
      type: String,
    },
    policyType: {
      type: String,
    },
    productCode: {
      type: String,
    },
    odPremium: {
      type: Number,
    },
    liabilityPremium: {
      type: Number,
    },
    netPremium: {
      type: Number,
    },
    finalEntryFields: {
      type: String,
    },
    odDiscount: {
      type: Number,
    },
    ncb: {
      type: Number,
    },
    advisorName: {
      type: String,
    },
    subAdvisor: {
      type: String,
    },
    policyMadeBy: {
      type: String,
    },
    branch: {
      type: String,
    },
    payoutOn: {
      type: String,
    },
    taxes: {
      type: Number,
    },
    policyPaymentMode: {
      type: String,
    },
    paymentDoneBy: {
      type: String,
    },
    chqNoRefNo: {
      type: String,
    },
    bankName: {
      type: String,
    },
    chqPaymentDate: {
      type: String,
    },
    chqStatus: {
      type: String,
    },
    advisorPayableAmount: {
      type: Number,
    },
    branchPayout: {
      type: Number,
    },
    branchPayableAmount: {
      type: Number,
    },
    companyPayout: {
      type: Number,
    },
    profitLoss: {
      type: Number,
    },
    hypo:{
      type:String,
    },
    staffName:{
      type: String,
    }, 
    staffType:{
      type: String,
    },
    employee_id:{
      type: String,
    },
    status:{
      type: String,
      enum: ["Pending", "Sent"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

const AllInsurance = mongoose.model('AllInsurance', AllInsurancePolicySchema);
export default AllInsurance;
