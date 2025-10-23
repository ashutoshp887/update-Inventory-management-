import nodemailer from "nodemailer";

const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to,
      subject,
      html,
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

export default sendMail;
