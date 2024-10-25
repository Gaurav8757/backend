import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const {
  TATA_AIG_4_WHEELER_QUOTE_URL,
  TATA_AIG_4_WHEELER_PROPOSAL_URL,
  TATA_AIG_4_WHEELER_MANUFACTURER,
  TATA_AIG_4_WHEELER_MANUFACTURER_MODEL,
  TATA_AIG_4_WHEELER_MANUFACTURER_MODEL_VARIANT,
  TATA_AIG_4_WHEELER_MANUFACTURER_MODEL_VARIANT_PRICEDATA,
  TATA_AIG_4_WHEELER_RTO
} = process.env;

const quoteApi = async (req, res) => {
  const authToken = req.headers.authorization;
  const data = req.body;
  try {
    const response = await axios.post(`${TATA_AIG_4_WHEELER_QUOTE_URL}`, data, {
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data.status === 200) {
      return response?.data;
    } else {
      return response?.data;
    }
  } catch (error) {
    return res.json(error.response?.data);
  }
};

const proposalApi = async (req, res) => {
  const authToken = req.headers.authorization;
  const datas = req.body; // Extract data from the request body
  try {
    const response = await axios.post(
      `${TATA_AIG_4_WHEELER_PROPOSAL_URL}`,
      datas,
      {
        headers: {
          Authorization: `${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === 200) {
      return response?.data;
    } else {
      return response?.data;
    }
  } catch (error) {
    return res.json(error.response?.data?.message);
  }
};

const vehicleMfg = async (req, res) => {
  const uatToken = req.headers.authorization;
  try {
    const response = await axios.get(`${TATA_AIG_4_WHEELER_MANUFACTURER}`, {
      headers: {
        Authorization: `${uatToken}`,
      },
    });
    if (response.data.status === 0) {
      return res.json(response?.data);
    } else {
      return res.json(response?.data);
    }
  } catch (error) {
    return res.json(error.response?.data?.txt);
  }
};

const vehicleMfgModel = async (req, res) => {
  const uatToken = req.headers.authorization;
  const { id, name } = req.params;
  try {
    const response = await axios.get(
      `${TATA_AIG_4_WHEELER_MANUFACTURER_MODEL}/${id}/${name}`,
      {
        headers: {
          Authorization: `${uatToken}`,
        },
      }
    );
    if (response.data.status === 0) {
      return res.json(response?.data);
    } else {
      return res.json(response?.data);
    }
  } catch (error) {
    return res.json(error.response?.data?.txt);
  }
};

const vehicleMfgModelVariant = async (req, res) => {
  const uatToken = req.headers.authorization;
  const { id, name } = req.params;
  try {
    const response = await axios.get(
      `${TATA_AIG_4_WHEELER_MANUFACTURER_MODEL_VARIANT}/${id}/${name}`,
      {
        headers: {
          Authorization: `${uatToken}`,
        },
      }
    );
    if (response.data.status === 0) {
      return res.json(response?.data);
    } else {
      return res.json(response?.data);
    }
  } catch (error) {
    return res.json(error.response?.data?.txt);
  }
};

const vehicleMfgModelVariantData = async (req, res) => {
  const uatToken = req.headers.authorization;
  const { id, name, vid, vname } = req.params;
  try {
    const response = await axios.get(
      `${TATA_AIG_4_WHEELER_MANUFACTURER_MODEL_VARIANT}/${id}/${name}/${vid}/${vname}`,
      {
        headers: {
          Authorization: `${uatToken}`,
        },
      }
    );
    if (response.data.status === 0) {
      return res.json(response?.data);
    } else {
      return res.json(response?.data);
    }
  } catch (error) {
    return res.json(error.response?.data?.txt);
  }
};

const vehicleMfgModelVariantPriceData = async (req, res) => {
  const uatToken = req.headers.authorization;
  const { id, name, vid, vname, txt_uw_zone } = req.params;
  try {
    const response = await axios.get(
      `${TATA_AIG_4_WHEELER_MANUFACTURER_MODEL_VARIANT_PRICEDATA}/${id}/${name}/${vid}/${vname}/${txt_uw_zone}`,
      {
        headers: {
          Authorization: `${uatToken}`,
        },
      }
    );
    if (response.data.status === 0) {
      return res.json(response?.data);
    } else {
      return res.json(response?.data);
    }
  } catch (error) {
    return res.json(error.response?.data?.txt);
  }
};

const rto = async (req, res) => {
  const rtoToken = req.headers.authorization;
  try {
    const response = await axios.get(`${TATA_AIG_4_WHEELER_RTO}`, {
      headers: {
        Authorization: `${rtoToken}`,
      },
    });
    if (response.data.status === 0) {
      return res.json(response?.data);
    } else {
      return res.json(response?.data);
    }
  } catch (error) {
    return res.json(error.response?.data?.txt);
  }
};

// const rtoByLocation = async (req, res) => {
//   const rtoToken = req.headers.authorization;
//   const location = req.params;
//   try {
//     const response = await axios.get(`${TATA_AIG_4_WHEELER_RTO}`, {
//       headers: {
//         Authorization: `${rtoToken}`,
//       },
//     });
//     if (response.data.status === 0) {
//       return res.json(response?.data);
//     } else {
//       return res.json(response?.data);
//     }
//   } catch (error) {
//     return res.json(error.response?.data?.txt);
//   }
// };

export {
  quoteApi,
  proposalApi,
  vehicleMfg,
  vehicleMfgModel,
  vehicleMfgModelVariant,
  vehicleMfgModelVariantData,
  vehicleMfgModelVariantPriceData,
  rto
};
