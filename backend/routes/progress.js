const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const progress_controller = require("../controllers/progressController");

// POST request for storing hours trained
router.post("/new", verify, progress_controller.progress_create_post);

// GET request for hours trained in a given month
router.get("/month/:id", verify, progress_controller.progress_month_get);

// GET request for hours trained in a given year
router.get("/year/:id", verify, progress_controller.progress_year_get);

module.exports = router;
