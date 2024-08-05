import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import Advisor from "../../models/advisor/advisorSchema.js";
dotenv.config();
const { SECRET } = process.env;

// ************************* Advisor ************************* //
export const advisorRegister = async (req, res) => {
  try {
    const { advisorname, advisoremail, advisormobile, advisorpassword, advisoraddress, branch, advisortype } = req.body;

    // Check if the user with the given email already exists
    const emailExist = await Advisor.findOne({ advisoremail });
    if (emailExist) {
      return res.status(400).json({
        status: "Advisor Already Exists",
        message: "Advisor with this email already exists.",
      });
    }

    // Find the last advisor in the database
    const lastAdvisor = await Advisor.findOne().sort({ _id: -1 }).limit(1);

    // Generate the next unique ID
    let lastId = 0; // Default ID if no advisor exists
    if (lastAdvisor) {
      const lastUniqueId = lastAdvisor.uniqueId;
      // console.log(lastAdvisor);
      // Extract the number part and increment it
      lastId = parseInt(lastUniqueId.split("-")[1]) + 1;
      // console.log(lastId);
    }
    const nextUniqueId = `EIPLADV-${String(lastId).padStart(5, "0")}`;
// console.log(nextUniqueId);
    // Save the new advisor to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(advisorpassword, salt);
    const newAdvisor = new Advisor({
      advisorname,
      advisoremail,
      advisormobile,
      advisoraddress,
      advisortype,
      branch,
      advisorpassword: hashedPassword,
      uniqueId: nextUniqueId,
    });

    await newAdvisor.save();

    return res.status(201).json({
      status: "New Advisor Added Successfully...!",
      message: {
        newAdvisor,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error to Adding Advisor",
      message: err.message,
    });
  }
};




//######################## login advisor ###########################//
export const loginAdvisor = async (req, res) => {
    try {
      const { advisoremail, advisormobile, advisorpassword } = req.body;
      let advisory;
      if (advisoremail) advisory = await Advisor.findOne({ advisoremail });
      else if (advisormobile) advisory = await Advisor.findOne({ advisormobile });
 
      if (!advisory) {
        return res.status(401).json({
          message: "Advisor Not Found",
        });
      }

      const isValidPassword = await bcrypt.compare(advisorpassword, advisory.advisorpassword);
      if (!isValidPassword) {
        return res.status(400).json("Password is Incorrect");
      }else{
     
    const token = jwt.sign(
        {
            advisorId: advisory._id,
        },
        SECRET,
        {
            expiresIn: "24h",
        }
    );
    return res.status(200).json({
        message: "Login Successful",
        advisory,
        token,
    })
}
    }
     catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }



//################### views all advisors #####################/
export const viewAdvisor = async (req, res) => {
  const advisorList = await Advisor.find({});
  if (!advisorList) {
    return res.status(400).json({
      status: "Error during advisor lists Update",
      message: "Invalid advisor selected",
    });
  } else {
    return res.status(200).json(advisorList);
  }
};



export const viewAdvisor1 = async (req, res) => {
  let { branch } = req.query;

  try {
    let query = {};
    if (branch) {
      // Convert branch to uppercase for consistency
      branch = branch.toUpperCase();
      query.branch = branch; // Filtering advisors by branch
    }
    
    const advisorList = await Advisor.find(query).sort({ uniqueid: 1 });

    if (advisorList.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No advisors found for the provided branch",
      });
    }

    return res.status(200).json(advisorList);
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Controller function to handle updating specific fields of a advisor
export const updateAdvisor = async (req, res) => {
  try {
    const advisorId = req.params.id;
    const updatedAdvisorData = req.body;

    // Check if the company exists before attempting to update
    const existingAdvisor = await Advisor.findById(advisorId);

    if (!existingAdvisor) {
      return res.status(404).json({
        status: "Advisor not found",
        message: "The specified Advisor ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedAdvisor = await Advisor.findByIdAndUpdate(
      advisorId,
      updatedAdvisorData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Advisor Updated Successfully!",
      message: {
        updatedAdvisor,
      },
    });
  } catch (err) {
    console.error("Error during Advisor Update:", err);
    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};



// forgot password
export const ForgotPassword = async (req, res) => {
  try {
    const user = await Advisor.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", );
      return res.status(400).json("Email not found. Register Now!");
    }
    // Generate a random token
    const secret = user._id + SECRET;
    let token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "15m",
    });
    // const link = `https://gauravnodejsauthentication.onrender.com/resetPassword/${user._id}/${token}`;
    const link = `https://api.eleedomimf.com/resetPassword/${user._id}/${token}`;
    
    //...................................Nodemailer code.......................................//
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, //own email id
        pass: process.env.PASSWORD, // own emailid password
      },
    });
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        // .......................Appears in header & footer of e-mails......................//
        name: "Eleedom Pvt Ltd",
        link: "https://mailgen.js/",
        copyright:
          "Copyright © 2024 Eleedom Pvt Ltd. All rights reserved.",
      },
    });
    //...................................Prepare email contents..............................//
    let response = {
      body: {
        name: "User",
        intro: [
          "You have received this email because a password reset request for your account was received.",
          "Valid till 15 Minutes only!",
        ],
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: "Reset your password",
            link: link,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };
    // .......................................Generate email....................................//
    const mail = mailGenerator.generate(response);
    //........................................Send email........................................//
    transporter.sendMail(
      {
        from: '"Eleedom Pvt Ltd"<example@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Password Reset Request", // Subject line
        html: mail,
      },

      (error, info) => {
        if (error) {
          res.status(500).json("Email not sent. Register Yourself!");
        }
        return res.status(200).json("Email sent successfully...!");
      }
    );
  } catch (error) {
    return res.status(500).json("An error occurred");
  }
}

//################### delete advisors #####################/
export const deleteAdvisor = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedAdvisor = await Advisor.findByIdAndDelete(userId);
    if (!deletedAdvisor) {
      return res.status(404).json({ message: "Advisor not found" });
    }
    return res.json({
      message: "Advisor deleted successfully",
      deletedAdvisor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
