import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // MUST be number
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Gym Website" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

  } catch (error) {
    console.error("SEND EMAIL ERROR:", error.message);
    throw error; // allow app.js to catch it
  }
};
