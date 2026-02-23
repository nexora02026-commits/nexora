const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
require("dotenv").config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ── Pages ──
app.get("/",              (req, res) => res.render("pages/home",      { title:"We Build. You Grow.", page:"home" }));
app.get("/packages",      (req, res) => res.render("pages/packages",  { title:"Packages & Pricing",  page:"packages" }));
app.get("/contact",       (req, res) => res.render("pages/contact",   { title:"Contact Us",          page:"contact" }));
app.get("/portfolio",     (req, res) => res.render("pages/portfolio", { title:"Portfolio",            page:"portfolio" }));
app.get("/about",         (req, res) => res.render("pages/about",     { title:"About Us",            page:"about" }));
app.get("/owner-section", (req, res) => res.render("pages/owner",     { title:"The Owner",           page:"owner" }));

// ── Draft API ──
const drafts = {};
app.post("/save-draft", (req, res) => {
  const { userId, name, email, package: pkg, message } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  drafts[userId] = { name, email, package: pkg, message };
  res.json({ status: "success", message: "Draft saved!" });
});
app.get("/draft/:userId", (req, res) => {
  res.json({ draft: drafts[req.params.userId] || {} });
});

// ── 404 ──
app.use((req, res) => {
  res.status(404).render("pages/404", { title:"Page Not Found", page:"" });
});

app.listen(PORT, () => console.log(`✅ NEXORA → http://localhost:${PORT}`));
