const express = require("express");

const {
  getAllNormalEntries,
  createNormalEntry,
  createRushEntry,
  getAllRushEntries,
} = require("../controllers/leaderboardController");

const router = express.Router();

router.post("/leaderboard/addNormal", createNormalEntry);
router.post("/leaderboard/addRush", createRushEntry);
router.get("/leaderboard/getNormal", getAllNormalEntries);
router.get("/leaderboard/getRush", getAllRushEntries);

module.exports = router;
