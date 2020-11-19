const dbQuery = require("../db/dev/dbQuery");
const { errorMessage, successMessage, status } = require("../helpers/status");

const createNormalEntry = async (req, res) => {
  const { username, time } = req.body;

  const createNormalEntryQuery =
    "INSERT INTO leader_normal( username, time) VALUES($1,$2) RETURNING *";
  const values = [username, time];

  try {
    const { rows } = await dbQuery.query(createNormalEntryQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllNormalEntries = async (req, res) => {
  const getAllNormalEntriesQuery =
    "SELECT * FROM leader_normal ORDER BY time ASC";

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

const createRushEntry = async (req, res) => {
  const { username, questions } = req.body;

  const createRushEntryQuery =
    "INSERT INTO leader_rush( username, questions) VALUES($1,$2) RETURNING *";
  const values = [username, questions];

  try {
    const { rows } = await dbQuery.query(createRushEntryQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllRushEntries = async (req, res) => {
  const getAllRushEntriesQuery =
    "SELECT * FROM leader_rush ORDER BY questions DESC";

  try {
    const { rows } = await dbQuery.query(getAllRushEntriesQuery);
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

module.exports = {
  getAllNormalEntries,
  createNormalEntry,
  createRushEntry,
  getAllRushEntries,
};
