import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import preguntadosApi from "../api/preguntadosApi";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {
        token: action.payload.token,
        username: action.payload.username,
        errorMessage: "",
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, username: null, errorMessage: "" };
    default:
      return state;
  }
};

const signin = (dispatch) => async ({ email, password, username }) => {
  try {
    const response = await preguntadosApi.post("/api/v1/auth/signin", {
      email,
      password,
      username,
    });

    try {
      await AsyncStorage.setItem("token", response.data.data.token);
      await AsyncStorage.setItem("username", response.data.data.username);
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "signin", payload: response.data.data });
    navigate("Home");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: error.response.data.error,
    });
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const username = await AsyncStorage.getItem("username");
  if (token) {
    dispatch({ type: "signin", payload: { token, username } });
    navigate("Home");
  } else {
    navigate("loginFlow");
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("username");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const response = await preguntadosApi.post("/api/v1/auth/login", {
      email,
      password,
    });

    try {
      await AsyncStorage.setItem("token", response.data.data.token);
      await AsyncStorage.setItem("username", response.data.data.username);
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "signin", payload: response.data.data });
    navigate("Home");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "add_error",
      payload: error.response.data.error,
    });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, clearErrorMessage, login, tryLocalSignin, signout },
  { errorMessage: "", username: "" }
);
