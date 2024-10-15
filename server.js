// const express = require("express");
// const app = express(); // Initialize the Express app

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other email services too
    auth: {
      user: "trimanico01@gmail.com", // Your email address
      pass: "#@$trimanico@9876", // Your email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: email, // Sender's email
    to: "shahamanish7@gmail.com", // Your email
    subject: subject,
    text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email: " + error.toString());
    }
    res.status(200).send("Message sent: " + info.response);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
