import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://712f8677e85f.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.token = `${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
