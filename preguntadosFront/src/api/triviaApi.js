import axios from "axios";

const instance = axios.create({
  baseURL: "https://opentdb.com/api.php",
});

export default instance;
