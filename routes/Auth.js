import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middleware from "../middleware/middleware.js";
import twilio from "twilio";
import dotenv from "dotenv";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "User Created Successfuly" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in adding user" });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User not exist" });
//     }
//     const cheakpassword = await bcrypt.compare(password, user.password);

//     if (!cheakpassword) {
//       return res
//         .status(401)
//         .json({ success: false, message: "wrong password" });
//     }
//     const token = jwt.sign({ id: user._id }, "secretkeyofsecutrdata123@#", {
//       expiresIn: "5h",
//     });

//     return res.status(200).json({
//       success: true,
//       token: { name: user.name },
//       message: "User login  Successfuly",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error in login user" });
//   }
// });

dotenv.config(); // load environment variables

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send WhatsApp message using Twilio
const sendWhatsAppMessage = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER, // e.g., "whatsapp:+14155238886"
      to, // e.g., "whatsapp:+1234567890"
    });
    console.log("WhatsApp message sent, SID:", result.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkeyofsecutrdata123@#", {
      expiresIn: "5h",
    });

    // Determine recipient phone number
    // Use user's phone if available, otherwise use a default number from environment variables
    const recipientPhone = user.phone
      ? `whatsapp:${user.phone}`
      : process.env.DEFAULT_WHATSAPP_RECIPIENT; // Make sure this variable starts with "whatsapp:"

    if (recipientPhone) {
      // Send WhatsApp message after a successful login
      await sendWhatsAppMessage(
        recipientPhone,
        `Hello ${user.name}, you have successfully logged in!`
      );
    } else {
      console.warn("No WhatsApp recipient number provided.");
    }

    return res.status(200).json({
      success: true,
      token, // This is the JWT token string generated earlier
      user: { id: user._id, name: user.name, email: user.email },
      message: "User login successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in login user" });
  }
});

router.get("./verify", middleware, async (req, res) => {
  return res.stutas(200).json({ success: true, user: req.user });
});

router.post("/set-lock-password", async (req, res) => {
  const { userId, lockPassword } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing. Please log in again." });
  }
  if (!lockPassword) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(lockPassword, 10);

    const user = await User.findByIdAndUpdate(userId, { lockPassword: hashedPassword }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Lock password set successfully" });
  } catch (error) {
    console.error("Error setting lock password:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Verify Lock Password
router.post("/verify-lock-password", async (req, res) => {
  const { userId, lockPassword } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!lockPassword) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user || !user.lockPassword) {
      return res.status(404).json({ message: "User not found or lock password not set" });
    }

    const isMatch = await bcrypt.compare(lockPassword, user.lockPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect lock password" });
    }

    res.status(200).json({ success: true, message: "Unlocked successfully" });
  } catch (error) {
    console.error("Error verifying lock password:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/get-lock-status/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ hasLockPassword: !!user.lockPassword });
  } catch (error) {
    console.error("Error fetching lock status:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
