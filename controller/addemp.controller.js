import AddEmployee from "../models/addempSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Mailgen from 'mailgen';
import bcrypt from "bcryptjs";
dotenv.config();
const { SECRET, EMAIL, PASSWORD } = process.env;

export const addempRegister = async (req, res) => {
  try {
    const {
      empid,
      empname,
      empemail,
      empmobile,
      empgender,
      empdob,
      empjoiningdate,
      empbranch,
      permanentempaddress,
      currentempaddress,
      empaadharno,
      accNumber,
      ifsc,
      bankName,
      staffType,  
      pan,
      emppassword,
      confirmemp_password,
      empdesignation,
    } = req.body;

     // Check if a file is provided in the request
     const empaadharfile = req.files && req.files["empaadharfile"] && req.files["empaadharfile"][0]
     ? "https://eleedomimf.onrender.com/uploads/" + req.files["empaadharfile"][0].filename
     : null;
     const panno = req.files && req.files["panno"] && req.files["panno"][0]
     ? "https://eleedomimf.onrender.com/uploads/" + req.files["panno"][0].filename
     : null;

       // Generate a password
    

    const empExist = await AddEmployee.findOne({ empid });
    // Check if empExist is not null
    if (empExist) {
      return res.status(400).json({
        status: "Employee Already Exists",
        message: "Employee with the given empid already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(emppassword, salt);
    


    // const uniqueid = generateEmpId();
    // Create a new employee instance
    const addnewEmployee = new AddEmployee({
      empid,
      empname,
      empemail,
      empmobile,
      emppassword: hashedPassword,
      confirmemp_password: hashedPassword,
      empgender,
      empdob,
      empjoiningdate,
      empbranch,
      permanentempaddress,
      currentempaddress,
      empaadharno,
      staffType,
      accNumber,
      ifsc,
      bankName,
      pan,
      panno,
      empdesignation,
      empaadharfile,
    });
    // Save the employee to the database
    await addnewEmployee.save();

// Send email to the newly registered user
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL, // Your email id
    pass: PASSWORD, // Your email password
  },
});

// Mailgen setup
const mailGenerator = new Mailgen({
theme: "cerberus",
product: {
  name: "Eleedom IMF Pvt Ltd",
  link: "https://mailgen.js/",
  // Adjust the following line accordingly
  // This will be displayed in the footer of the email
  copyright: `Copyright © ${new Date().getFullYear()} Eleedom IMF Pvt Ltd. All rights reserved.`,
},
});

// Prepare email content
const response = {
body: {
  name: empname,
  intro: [
      "Welcome to My Company!.",
      "Your account has been successfully created with the following credentials:",
  ],
  
  action: [{
      button: {
          color: "#209320",
          text: `Email:   ${empemail}`,
      }, 
  },
  {
    button: {
      color: "#209320",
      text: `Password:   ${emppassword}`, 
  },
  }
],
  
  outro: "You can now log in to your account and start using our services.",
},
};

// Generate email
const mail = mailGenerator.generate(response);

const mailOptions = {
  from: `"Eleedom IMF Pvt Ltd (Employee)" your_email@gmail.com`, // Sender address
  to: empemail, // Receiver's email address
  subject: "Welcome to Our Eleedom IMF Pvt Ltd!", // Email subject
  html: mail
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    return res.status(500).json({
      status: "Email not sent",
      message: "Error sending welcome email",
    }, error);
  }
  return res.status(200).json("Email sent successfully...!" + info.response);
});

    return res.status(201).json({
      status: "Employee Added Successfully",
      message: {
        addnewEmployee,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Registration",
      message: err.message,
    });
  }
};

//######################## login employee ###########################//
export const loginEmployee = async (req, res) => {
  try {
    const { empemail, empmobile, emppassword } = req.body;
    let user;
    if (empemail) {
      user = await AddEmployee.findOne({ empemail });
    } else if (empmobile) {
      user = await AddEmployee.findOne({ empmobile });
    }

    if (!user) {
      return res.status(401).json({
        message: "Employee Not Found",
      });
    }

    // Simple password check
    if (emppassword !== user.emppassword) {
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
      message: "Login Successfully!",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}


//################### views all employees #####################/
export const viewEmployee = async (req, res) => {
  try {
    const result = await AddEmployee.aggregate([
      {
        $lookup: {
          from: "empattendances",
          localField: "_id",
          foreignField: "employee_id",
          as: "employeeDetails"
        }
      }
     
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error fetching employee attendance list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//####### list of employee name based on staff type #######/
export const listOfEmp = async (req, res)=>{
  try {
    // Aggregate to group employees by staffType and push empname into an array
    const aggregatedResult = await AddEmployee.aggregate([
        {
            $group: {
                _id: "$staffType",
                empnames: { $push: { _id: "$_id", empname: "$empname" } }
            }
        }
    ]);
    
    if (!aggregatedResult || aggregatedResult.length === 0) {
        return res.status(404).json({
            status: "Error",
            message: "No data found"
        });
    }
    return res.status(200).json(aggregatedResult);
} catch (error) {
    console.error("Error during aggregation:", error);
    return res.status(500).json({
        status: "Error",
        message: "Internal server error"
    });
}
}




//################ update code ########################/
export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;

    // Check if the empoyee exists before attempting to update
    const existingEmployee = await AddEmployee.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({
        status: "Employee not found",
        message: "The specified Employee ID does not exist in the database",
      });
    }

    // Perform the update
    const updatedEmployee = await AddEmployee.findByIdAndUpdate(
      employeeId,
      employeeData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Employee Updated Successfully!",
      message: {
        updatedEmployee,
      },
    });
  } catch (err) {
    console.error("Error during Employee Update:", err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
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



// .................................Forgot Page Logic......................................//
export const forgotOpsPassword = async (req, res) => {
  try {
    const { opsemail } = req.body;
    const user = await OpsAdmin.findOne({ opsemail });
    if (!user) {
      return res.status(400).json("Email not found. Register Now!");
    }

    // Generate a random token
    const secret = user._id + SECRET;
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "15m",
    });

    // Generate reset password link
    const link = `${LINK2}/${user._id}/${token}`;
   
    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL, // Your email id
        pass: PASSWORD, // Your email password
      },
    });

    // Mailgen setup
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Eleedom IMF Pvt Ltd",
        link: "https://mailgen.js/",
        // Adjust the following line accordingly
        // This will be displayed in the footer of the email
        copyright: `Copyright © ${new Date().getFullYear()} Eleedom IMF Pvt Ltd. All rights reserved.`,
      },
    });

    // Prepare email content
    const response = {
      body: {
        name: user.opsname,
        intro: [
          "You have received this email because a password reset request for your account was received.",
          "Valid for 15 Minutes only!",
        ],
        action: {
          instructions: "Click the button below to reset your password:",
          // instructions: link,
          button: {
            color: "#A31217",
            text: "Reset your password",
            link: link,
          },
        },

        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    // Generate email
    const mail = mailGenerator.generate(response);

    // Send email
    transporter.sendMail(
      {
        from: '"Eleedom IMF Pvt Ltd" <example@gmail.com>', // Sender address
        to: user.opsemail, // Receiver's email address
        subject: "Password Reset Request", // Email subject
        html: mail, // Email content
      },
      (error, info) => {
        if (error) {
          return res
            .status(500)
            .json("Email not sent. Register Yourself!", error);
        }
        return res
          .status(200)
          .json("Email sent successfully...!" + info.response);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occurred..!", error);
  }
};

// update forgetted [password]
// .......................................Update Password..................................//
export const opsPasswordReset = async (req, res) => {
  const { opspassword, confirm_opspassword } = req.body;
  const { id, token } = req.params; // Access id from params
  const user = await OpsAdmin.findById(id);
  const new_secret = user._id + SECRET;

  try {
    jwt.verify(token, new_secret);

    if (opspassword && confirm_opspassword) {
      if (opspassword !== confirm_opspassword) {
        return res.status(400).json("Passwords doesn't Match. Try Again..!");
      } 
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(opspassword, salt);
        const hashedPassword1 = await bcrypt.hash(confirm_opspassword, salt);
        await OpsAdmin.findByIdAndUpdate(user._id, {
          $set: {
            opspassword: hashedPassword,
            confirm_opspassword: hashedPassword1,
          },
        });

        // Send email to user with the updated password
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EMAIL,
            pass: PASSWORD,
          },
        });

        // Mailgen setup
const mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
        name: "Eleedom IMF Pvt Ltd",
        link: "https://mailgen.js/",
        // Adjust the following line accordingly
        // This will be displayed in the footer of the email
        copyright: `Copyright ©${new Date().getFullYear()} Eleedom IMF Pvt Ltd. All rights reserved.`,
    },
  });
// Prepare email content
const response = {
    body: {
        name: `, ${user.opsname}`,
        intro: [
            "You have received this email because a password reset request.",
            "Your password has been successfully reset. Your new password is:",
        ],
        action: {
            button: {
                color: "#A31217",
                text: `${opspassword}`,  
            },
        },
    //   utro: "If you did not request a password reset, no further action is required on your part.",
    },
  };
  
  // Generate email
  const mail = mailGenerator.generate(response);
        const mailOptions = {
          from: "Eleedom IMF Pvt Ltd <your_email@gmail.com>",
          to: user.opsemail,
          subject: "Your Password has been Reset",
          html: mail
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res
              .status(500)
              .json("Error occurred while sending email..!", error);
          } else {
            return res.status(200).json("Email sent", info.response);
          }
        });
        return res.status(200).json("Password Updated Successfully..!");
      
    }
  } catch (error) {
    return res.status(500).json("Invalid Link or Expired..!" + error);
  }
};









//  delete employee controller
export const deleteEmployee = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedEmployee = await AddEmployee.findByIdAndDelete(userId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.json({ message: "User deleted successfully", deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


