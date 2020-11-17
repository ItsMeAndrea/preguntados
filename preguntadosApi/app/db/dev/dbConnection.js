const pool = require("./pool");

pool.on("connect", () => {
  console.log("connected to db");
});

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});
