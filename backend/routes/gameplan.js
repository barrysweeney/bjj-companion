const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const gameplan_controller = require("../controllers/gameplanController");

// GET request for all gameplans
router.get("/", verify, gameplan_controller.index);

// POST request for creating a gameplan
router.post("/new", verify, gameplan_controller.gameplan_create_post);

module.exports = router;
