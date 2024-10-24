import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const { TATA_AIG_4_WHEELER_QUOTE_URL, TATA_AIG_4_WHEELER_PROPOSAL_URL } =
  process.env;

// const quoteApi = async (req, res) => {
//   const authToken = req.headers.authorization;
//   const data  = req.body;
//   console.log(data);
//   try {
//     const response = await axios.post(`${TATA_AIG_4_WHEELER_QUOTE_URL}`, data, {
//       headers: {
//         Authorization: `${authToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response.data);

//     if (response.data.status === 200) {
//       return res.status(200).json(response.data);
//     } else {
//       return res.json(response);
//     }
//   } catch (error) {
//     return res
//       .status(error.response?.status || 500)
//       .json({ message: error.response?.data?.message });
//   }
// };

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
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return res.json(error.response.data);
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
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return res.json(error.response?.data?.message);
  }
};

export { quoteApi, proposalApi };
