const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const usersRoute = require("./app/routes/usersRoute");
const leaderboardRoute = require("./app/routes/leaderboardRoute");

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
app.use("/api/v1", usersRoute);
app.use("/api/v1", leaderboardRoute);

app.listen(process.env.SERVER_PORT).on("listening", () => {
  console.log(`live from ${process.env.SERVER_PORT}`);
});
