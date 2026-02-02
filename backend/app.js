import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();

// Load environment variables
config({ path: "./config.env" });

// Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.post("/send/mail", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    await sendEmail({
      email: "merndeveloper81@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
      `,
    });

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
