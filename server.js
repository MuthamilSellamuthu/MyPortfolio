const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure your mail transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muthamils.23csd@kongu.edu',       // Replace with your Gmail
      pass: '',          // Use App Password (not your regular password)
    },
  });

  const mailOptions = {
    from: email,
    to: 'muthamils.23csd@kongu.edu',           // Where you want to receive the message
    subject: `Portfolio Contact - ${name}`,
    text: `You have received a message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
