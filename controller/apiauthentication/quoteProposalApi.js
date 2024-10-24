import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const { TATA_AIG_4_WHEELER_QUOTE_URL, TATA_AIG_4_WHEELER_PROPOSAL_URL } =
  process.env;

const quoteApi = async (req, res) => {
  const authToken = req.headers.authorization;
  const data = req.body; // Extract data from the request body
  console.log(data);

  try {
    const response = await axios.post(`${TATA_AIG_4_WHEELER_QUOTE_URL}`, data, {
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === 200) {
      console.log(response.data);
      return res.status(200).json(response.data);
    } else {
      return res.json(response.data);
    }
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data?.message });
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
      console.log(response.data);
      return res.status(200).json(response.data);
    } else {
      return res.json(response.data);
    }
  } catch (error) {
    return res
      .status(error.response.status)
      .json({ message: error.response.data.message });
  }
};

export { quoteApi, proposalApi };
