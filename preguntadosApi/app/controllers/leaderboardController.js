const dbQuery = require("../db/dev/dbQuery");
const { errorMessage, successMessage, status } = require("../helpers/status");

const createNormalEntry = async (req, res) => {
  const { username, time } = req.body;

  const createEntryQuery =
    "INSERT INTO leader_normal( username, time) VALUES($1,$2) RETURNING *";
  const values = [username, time];

  try {
    const { rows } = await dbQuery.query(createEntryQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllNormalEntries = async (req, res) => {
  const getAllNormalEntriesQuery = "SELECT * FROM leader_normal";

  try {
    const { rows } = await dbQuery.query(getAllNormalEntriesQuery);
    const dbResponse = rows;

    if (!dbResponse[0]) {
      errorMessage.error = "There's no data";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

const createRushEntry = () => {};

module.exports = { getAllNormalEntries, createNormalEntry, createRushEntry };
