import AddBranch from "../models/addbranchSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const { SECRET, LINK, EMAIL, PASSWORD } = process.env;

function getCurrentYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear;
}

// Example usage
const year = getCurrentYear();


export const loginBranch = async(req, res) => {
    try {
        const { branchemail, password } = req.body;
        //  console.log(branchemail, password);
        let user;
        if (branchemail) user =  await AddBranch.findOne({ branchemail });
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
            user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// .................................Forgot Page Logic......................................//
export const forgotBranchPassword = async (req, res) => {
    try {
      const { email } = req.body;
        const user = await AddBranch.findOne({ email });
        if (!user) {
            return res.status(400).json("Email not found. Register Now!");
        }
  
        // Generate a random token
        const secret = user._id + SECRET;
        const token = jwt.sign({ userId: user._id }, secret, {
            expiresIn: "15m",
        });
  
        // Generate reset password link
        const link =`${LINK}/${user._id}/${token}`;
  
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
                copyright: `Copyright ©${year} Eleedom IMF Pvt Ltd. All rights reserved.`,
            },
        });
  
        // Prepare email content
        const response = {
            body: {
                name: user.branchname,
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
                
            
                outro: "If you did not request a password reset, no further action is required on your part.",
            },
        };
  
        // Generate email
        const mail = mailGenerator.generate(response);
  
        // Send email
        transporter.sendMail({
            from: '"Eleedom IMF Pvt Ltd" <example@gmail.com>', // Sender address
            to: user.email, // Receiver's email address
            subject: "Password Reset Request", // Email subject
            html: mail, // Email content
        }, (error, info) => {
            if (error) {
                return res.status(500).json("Email not sent. Register Yourself!", error);
            }
            return res.status(200).json("Email sent successfully...!");
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json("An error occurred..!");
    }
  };
  
  // update forgetted [password]
  // .......................................Update Password..................................//
  export const branchPasswordReset = async (req, res) => {
    const { password, confirm_password } = req.body;
    const { id, token } = req.params; // Access id from params
    const user = await AddBranch.findById(id);
    const new_secret = user._id + SECRET;
    try {
      jwt.verify(token, new_secret);
      if (password && confirm_password) {
        if (password !== confirm_password) {
          return res.status(400).json("Passwords doesn't Match. Try Again..!");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const hashedPassword1 = await bcrypt.hash(confirm_password, salt);
          await AddBranch.findByIdAndUpdate(user._id, {
            $set: {
              password: hashedPassword,
              confirm_password: hashedPassword1,
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
  
          const mailOptions = {
            from: "Eleedom IMF Pvt Ltd <your_email@gmail.com>",
            to: user.email,
            subject: "Your Password has been Reset",
            text: `Your password has been successfully reset. Your new password is: ${password}`,
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json("Error occurred while sending email..!", error);
            } else {
              return res.status(200).json("Email sent", info.response);
            }
          });
          return res.status(200).json("Password Updated Successfully..!");
        }
      }
    } catch (error) {
      return res.status(400).json("Invalid Link or Expired..!", error);
    }
  };
  


