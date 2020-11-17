const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const usersRoute = require("./app/routes/usersRoute");

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
app.use("/api/v1", usersRoute);

/* //create user
app.post("/users", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users(email,password,username) VALUES($1,$2,$3) RETURNING *",
      [email, password, username]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id  = $1", [
      id,
    ]);

    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
}); */

app.listen(process.env.SERVER_PORT).on("listening", () => {
  console.log(`live from ${process.env.SERVER_PORT}`);
});
