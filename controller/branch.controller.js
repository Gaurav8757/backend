import AddBranch from "../models/addbranchSchema.js";
import Branches from "../models/branchSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const { SECRET } = process.env;

export const loginBranch = async (req, res) => {
    try {
        const { branchemail, password } = req.body;
        // console.log(email, password);
        let user;
        if (branchemail) user = await AddBranch.findOne({ branchemail });
        if (!user) {
            return res.status(401).json({
                message: "Branch Not Found",
            });
        }
       
        // Simple password check
        if (password !== user.password) {
            return res.status(400).json({
                message: "Password is Incorrect",
            });
        }

        // User authentication successful; create a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            SECRET,
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            message: "Login Successful",
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};
