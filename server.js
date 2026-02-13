// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.render("pages/home"));
app.get("/packages", (req, res) => res.render("pages/packages"));
app.get("/contact", (req, res) => res.render("pages/contact"));
app.get("/portfolio", (req, res) => res.render("pages/portfolio"));
app.get("/about", (req, res) => res.render("pages/about"));
app.get("/owner-section", (req, res) => res.render("pages/owner"));
let draft = {};
app.post("/save-draft", (req, res) => {
  const { userId, name, email, package: pkg, message } = req.body;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  drafts[userId] = { name, email, package: pkg, message };
  res.json({ status: "success", message: "Draft saved!" });
});

// جلب مسودة
app.get("/draft/:userId", (req, res) => {
  const draft = drafts[req.params.userId] || {};
  res.json({ draft });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
