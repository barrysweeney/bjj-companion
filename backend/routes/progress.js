const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const progress_controller = require("../controllers/progressController");

// GET request for hours trained
router.get("/", verify, progress_controller.index);

// POST request for storing hours trained
router.post("/new", verify, progress_controller.progress_create_post);

module.exports = router;
