import axios from "axios";

const instance = axios.create({
  baseURL: "http://60d0b97fc4b3.ngrok.io",
});

/* instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
); */

export default instance;
