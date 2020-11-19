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

const createLeaderNormalTable = () => {
  const leaderNormalQuery = `CREATE TABLE IF NOT EXISTS leader_normal
  (leaderNormal_id SERIAL PRIMARY KEY, 
  username VARCHAR(100) NOT NULL,  
  time float NOT NULL)`;

  pool
    .query(leaderNormalQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createLeaderRushTable = () => {
  const leaderRushQuery = `CREATE TABLE IF NOT EXISTS leader_rush
  (leaderRush_id SERIAL PRIMARY KEY, 
  username VARCHAR(100) NOT NULL,  
  questions float NOT NULL)`;

  pool
    .query(leaderRushQuery)
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

const dropLeaderNormalTable = () => {
  const LeaderNormalQuery = "DROP TABLE IF EXISTS leader_normal";
  pool
    .query(LeaderNormalQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropLeaderRushTable = () => {
  const LeaderRushQuery = "DROP TABLE IF EXISTS leader_rush";
  pool
    .query(LeaderRushQuery)
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
  createLeaderNormalTable();
  createLeaderRushTable();
};

const dropAllTables = () => {
  dropUserTable();
  dropLeaderNormalTable();
  dropLeaderRushTable();
};
pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = { createAllTables, dropAllTables };

const makeRunnable = require("make-runnable");
makeRunnable;
