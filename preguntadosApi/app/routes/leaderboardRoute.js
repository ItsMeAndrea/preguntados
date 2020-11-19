const express = require("express");

const {
  createNormalEntry,
  createRushEntry,
  getAllNormalEntries,
} = require("../controllers/leaderboardController");

const router = express.Router();

router.post("/leaderboard/addNormal", createNormalEntry);
router.post("/leaderboard/addRush", createRushEntry);
router.get("/leaderboard/getNormal", getAllNormalEntries);

module.exports = router;
