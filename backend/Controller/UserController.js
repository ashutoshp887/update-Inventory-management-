import usermodel from '../Model/UserSchema.js';
import JWT from 'jsonwebtoken';
import sendmail from '../Middleware/SendMail.js';
import sendMail from '../Middleware/Resendmail.js';

export const registerUser = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        const existingUser = await usermodel.findOne({ Email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" }); // ✅ add return
        }

        const user = new usermodel({ Name, Email, Password });
        const otp = Math.floor(Math.random() * 10000);
        console.log(otp);

        const activtoken = JWT.sign(
            {
               user, // technically works, risky but same logic
                otp,
            },
            process.env.ACTIVE_SCRET,
            { expiresIn: "7d" }
        );

        const data = { Name, otp };
        console.log(data);
        await sendmail(Email, "Welcome Invnetory World", data);

        // This line will not be reached if the user already exists
        
       
        return res.status(200).json({
            message: "OTP sent to your mail",
            activtoken
        });
    } catch (error) {
        console.log(error); // ✅ log error
        res.status(500).send({ message: "Internal Server Error" });
    }
};


export  const VerifyUser = async(req,res)=>{
    try{
const{activtoken} = req.body;
const verify = JWT.verify(activtoken,process.env.ACTIVE_SCRET);
if(!verify)
    return res.status(400).json({
        message:"OTP expired"
    })
  if (parseInt(verify.otp) !== parseInt(req.body.otp))

        return res.status(400).json({
            message:"Invalid OTP"
        })
        await usermodel.create({
           Name: verify.user.Name,
            Email: verify.user.Email,
            Password: verify.user.Password
        });
        res.json({
            message: "user registered"
        })
        
    }catch(error){
console.log(error)
    }
}



export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const unique = await usermodel.findOne({ Email });
    if (!unique) {
      return res.status(400).send({ message: "Please register" });
    }

    // plain password check (testing only)
    if (Password !== unique.Password) {
      return res.status(400).send({ message: "Password is incorrect" });
    }

    const token = JWT.sign(
      { id: unique._id, Email: unique.Email },
      process.env.ACTIVE_SCRET,
      { expiresIn: "7d" }
    );

    // cookie set (not httpOnly for testing)
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).send({
      message: "Login successful",
      token: token,
      user: unique,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await usermodel.findOne({ Email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Use your env key
    const resetToken = JWT.sign(
      { id: user._id },
      process.env.ACTIVE_SCRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family:sans-serif; line-height:1.5;">
        <h2>Password Reset Request</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" target="_blank" style="
          display:inline-block;
          padding:10px 20px;
          background-color:#4CAF50;
          color:white;
          text-decoration:none;
          border-radius:5px;
        ">Reset Password</a>
        <p style="color:red; font-size:12px;">This link will expire in 15 minutes.</p>
      </div>
    `;

    await sendMail(user.Email, "Password Reset", html);

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { Password } = req.body;

    // Verify token
    const decoded = JWT.verify(token, process.env.ACTIVE_SCRET);
    if (!decoded) return res.status(400).json({ message: "Invalid or expired token" });

    // Directly update password without hashing
    await usermodel.findByIdAndUpdate(decoded.id, { Password });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};






export const googleLoginUser = async (req, res) => {
  try {
    const { Name, Email, googleId, profilePic } = req.body;

    if (!Email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user already exists
    let user = await usermodel.findOne({ Email });

    if (user) {
      // Update user info if needed
      user.Name = Name || user.Name;
      user.Email = Email || user.Email;
      user.googleId = googleId || user.googleId;
      user.profilePic = profilePic || user.profilePic;
      await user.save();
    } else {
      // Create new user
      user = new usermodel({
        Name,
        Email,
        googleId,
        profilePic,
      });
      await user.save();
    }

    // Generate JWT token
    const token = JWT.sign(
      { id: user._id, email: user.Email },
      process.env.ACTIVE_SCRET, // your JWT secret
      { expiresIn: "7d" }
    );

    // Set cookie (optional, not httpOnly for testing)
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
