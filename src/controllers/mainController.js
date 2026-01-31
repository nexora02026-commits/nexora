const nodemailer = require("nodemailer");

exports.home = (req, res) => res.render("pages/home");
exports.packages = (req, res) => res.render("pages/packages");
exports.portfolio = (req, res) => res.render("pages/portfolio");
exports.about = (req, res) => res.render("pages/about");
exports.contact = (req, res) => res.render("pages/contact");

exports.contactPost = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // أو أي خدمة تحبها
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.render("pages/contact", {
      success: true,
      msg: "Message sent successfully!",
    });
  } catch (err) {
    console.log(err);
    res.render("pages/contact", {
      success: false,
      msg: "Error sending message. Try again.",
    });
  }
};
