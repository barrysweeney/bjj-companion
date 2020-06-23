const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const note_controller = require("../controllers/noteController");

// GET request for all notes
router.get("/", verify, note_controller.note_get);

// POST request for creating new note
router.post("/new", verify, note_controller.note_create_post);

module.exports = router;
