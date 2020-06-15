const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

// POST request for creating user
router.post("/create", user_controller.user_create_post);

module.exports = router;
