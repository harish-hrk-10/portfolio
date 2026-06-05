import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "harishrathnakumar10@gmail.com",
      subject: "New Portfolio Message",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});