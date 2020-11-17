const dbQuery = require("../db/dev/dbQuery");
const { errorMessage, successMessage, status } = require("../helpers/status");
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} = require("../helpers/validation");

const createUser = async (req, res) => {
  const { email, password, username } = req.body;

  if (isEmpty(email) || isEmpty(password) || isEmpty(username)) {
    errorMessage.error = "Los campos no pueden estar vacios";
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidEmail(email)) {
    errorMessage.error = "Ingrese un correo valido";
    return res.status(status.bad).send(errorMessage);
  }

  if (!validatePassword(password)) {
    errorMessage.error = "La contraseña debe tener mas de 5 caracteres";
    return res.status(status.bad).send(errorMessage);
  }

  const hashedPassword = hashPassword(password);

  const createUserQuery =
    "INSERT INTO users(email,password,username) VALUES($1,$2,$3) RETURNING *";
  const values = [email, hashedPassword, username];

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];

    delete dbResponse.password;

    const token = generateUserToken(dbResponse.email, dbResponse.id);

    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === "_bt_check_unique") {
      errorMessage.error = "Correo ya registrado";
      return res.status(status.conflict).send(errorMessage);
    }

    errorMessage.error = "Hubo un error en la operacion 555";
    return res.status(status.error).send(errorMessage);
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = "Debe completar los campos";
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = "Correo o contraseña invalidos";
    return res.status(status.bad).send(errorMessage);
  }

  const signinUserQuery = "SELECT * FROM users WHERE email = $1";

  try {
    const { rows } = await dbQuery.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "El correo no esta registrado";
      return res.status(status.notfound).send(errorMessage);
    }

    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = "La contraseña es incorrecta";
      return res.status(status.bad).send(errorMessage);
    }

    const token = generateUserToken(dbResponse.email, dbResponse.id);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = { createUser, signinUser };
