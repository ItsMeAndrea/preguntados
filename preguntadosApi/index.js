const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create user
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
});

app.listen(5000, () => {
  console.log("server 5000");
});
//test
