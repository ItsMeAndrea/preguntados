const express = require("express");

const { createUser, signinUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/auth/signin", createUser);
router.post("/auth/login", signinUser);

module.exports = router;
