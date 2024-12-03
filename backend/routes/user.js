const express = require("express");
const router = express.Router();

// Controllers
const {login, signup} = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;