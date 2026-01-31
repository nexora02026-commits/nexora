const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Pages
router.get("/", mainController.home);
router.get("/packages", mainController.packages);
router.get("/portfolio", mainController.portfolio);
router.get("/about", mainController.about);
router.get("/contact", mainController.contact);

// Contact form submission
router.post("/contact", mainController.contactPost);

module.exports = router;
