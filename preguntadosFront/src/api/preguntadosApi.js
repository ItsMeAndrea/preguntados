import axios from "axios";

const instance = axios.create({
  baseURL: "https://pregunta2back.herokuapp.com/",
});

export default instance;
