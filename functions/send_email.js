const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Parse the request body to extract form data
  const { name, email, subject, message } = JSON.parse(event.body);

  // Set up Nodemailer transport with your Gmail credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your Gmail address
      pass: "your-app-password", // Replace with your App-specific password
    },
  });

  // Set up email data
  const mailOptions = {
    from: email, // Sender's email (user's email)
    to: "trimanico01@gmail.com", // Your email to receive the message
    subject: subject,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email." }),
    };
  }
};
