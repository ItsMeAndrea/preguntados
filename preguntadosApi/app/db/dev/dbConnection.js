const pool = require("./pool");

pool.on("connect", () => {
  console.log("connected to db");
});

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (user_id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  username VARCHAR(100) UNIQUE NOT NULL,  
  password VARCHAR(100) NOT NULL)`;

  pool
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const usersDropQuery = "DROP TABLE IF EXISTS users";

  pool
    .query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUserTable();
};
pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = { createAllTables, dropAllTables };

const makeRunnable = require("make-runnable");
makeRunnable;
