import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajeeenec@gmail.com",
    pass: "kioblbbqllwmigjv",
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "rajeeenec@gmail.com",
      to: to,
      subject: subject,
      text: text,
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    throw new Error("Error sending email:", err.message);
  }
};

export default sendEmail;
