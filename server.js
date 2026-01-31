// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => res.render("pages/home"));
app.get("/packages", (req, res) => res.render("pages/packages"));
app.get("/contact", (req, res) => res.render("pages/contact"));
app.get("/portfolio", (req, res) => res.render("pages/portfolio"));
app.get("/about", (req, res) => res.render("pages/about"));

// POST contact form
app.post("/contact", async (req, res) => {
  const { name, email, package: packageSelected, message } = req.body;

  const msg = {
    to: process.env.EMAIL_TO, // انت هتستقبل الإيميل هنا
    from: process.env.EMAIL_TO, // نفس الإيميل لازم يكون verified في SendGrid
    subject: `New Contact Form - Package: ${packageSelected}`,
    text: `Name: ${name}\nEmail: ${email}\nPackage: ${packageSelected}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Package:</strong> ${packageSelected}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email. Try again!");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
