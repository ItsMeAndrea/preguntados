import createDataContext from "./createDataContext";
import triviaApi from "../api/triviaApi";
import preguntadosApi from "../api/preguntadosApi";
import { navigate } from "../navigationRef";

const triviaReducer = (state, action) => {
  switch (action.type) {
    case "get_normal_questions":
      return {
        ...state,
        normalQuestions: action.payload,
        isLoading: false,
      };
    case "exit_game":
      return {
        isLoading: true,
        normalQuestions: [{ question: "" }],
        rushQuestions: [{ question: "" }],
      };
    case "get_rush_questions":
      return { ...state, rushQuestions: action.payload, isLoading: false };
    case "get_normal_leaderboard":
      return {
        ...state,
        normalLeaderboard: action.payload,
        isLoading: false,
      };
    case "get_rush_leaderboard":
      return {
        ...state,
        rushLeaderboard: action.payload,
        isLoading: false,
      };
    case "post_results":
      return { ...state, addingResults: false };
    case "post_multiplayer":
      return { ...state, isLoading: false };
    case "get_game":
      return {
        ...state,
        multiplayerGame: action.payload,
        isLoading: false,
      };
    case "get_game_code":
      return {
        ...state,
        gameInfo: action.payload,
        gettingData: false,
      };
    case "no_game":
      return { ...state, noGameAlert: action.payload, gettingData: false };
    default:
      return state;
  }
};

const getNormalQuestions = (dispatch) => async () => {
  try {
    const response = await triviaApi.get("?amount=10&type=multiple");
    dispatch({ type: "get_normal_questions", payload: response.data.results });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const getRushQuestions = (dispatch) => async () => {
  const response = await triviaApi.get("?amount=50&type=multiple");
  dispatch({ type: "get_rush_questions", payload: response.data.results });
};

const handleExitGame = (dispatch) => () => {
  dispatch({ type: "exit_game" });
};

const addToNormalLeaderboard = (dispatch) => async ({
  username,
  questions,
  gameWon,
}) => {
  try {
    const response = await preguntadosApi.post(
      "/api/v1/leaderboard/addNormal",
      {
        username,
        questions,
      }
    );

    dispatch({ type: "post_results" });
    navigate("Results", { gameWon, questions });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const addToRushLeaderboard = (dispatch) => async ({
  username,
  questions,
  gameWon,
}) => {
  try {
    const response = await preguntadosApi.post("/api/v1/leaderboard/addRush", {
      username,
      questions,
    });
    dispatch({ type: "post_results" });
    navigate("Results", { gameWon, questions });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const getNormalLeaderboard = (dispatch) => async () => {
  try {
    const response = await preguntadosApi.get("/api/v1/leaderboard/getNormal");

    dispatch({
      type: "get_normal_leaderboard",
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const getRushLeaderboard = (dispatch) => async () => {
  try {
    const response = await preguntadosApi.get("/api/v1/leaderboard/getRush");
    dispatch({
      type: "get_rush_leaderboard",
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const createMulltiplayer = (dispatch) => async ({
  game_code,
  player_one,
  questions_one,
  gameWon,
}) => {
  console.log(game_code, "game code");
  try {
    const response = await preguntadosApi.post("/api/v1/multiplayer/addGame", {
      game_code,
      player_one,
      questions_one,
    });
    dispatch({ type: "post_results" });
    navigate("Results", { gameWon, game_code, questions: questions_one });
  } catch (error) {
    console.log(error.message, "error");
  }
};

const addPlayerOne = (dispatch) => async ({
  game_code,
  player_one,
  questions_one,
  gameWon,
}) => {
  try {
    const response = await preguntadosApi.put(
      "/api/v1/multiplayer/updateGame",
      { game_code, player_one, questions_one }
    );
    dispatch({ type: "post_results" });
    navigate("Results", { gameWon });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const addPlayerTwo = (dispatch) => async ({
  game_code,
  player_two,
  questions_two,
  gameWon,
}) => {
  try {
    const response = await preguntadosApi.put(
      "/api/v1/multiplayer/updateGame",
      { game_code, player_two, questions_two }
    );
    dispatch({ type: "post_results" });
    navigate("Results", {
      gameWon,
      game_code,
      questions: questions_two,
      playerTwo: true,
    });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const getGameByUser = (dispatch) => async ({ username }) => {
  try {
    const response = await preguntadosApi.get(
      `/api/v1/multiplayer/getGameByUser/${username}`
    );

    dispatch({ type: "get_game", payload: response.data.data });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

const getGameByCode = (dispatch) => async ({ game_code }) => {
  try {
    const response = await preguntadosApi.get(
      `api/v1/multiplayer/getGame/${game_code}`
    );
    dispatch({ type: "get_game_code", payload: response.data.data });
  } catch (error) {
    console.log(error.response.data, "error");
    dispatch({ type: "no_game", payload: error.response.data.error });
  }
};
export const { Provider, Context } = createDataContext(
  triviaReducer,
  {
    getNormalQuestions,
    handleExitGame,
    addToNormalLeaderboard,
    addToRushLeaderboard,
    getRushQuestions,
    getNormalLeaderboard,
    getRushLeaderboard,
    createMulltiplayer,
    addPlayerOne,
    addPlayerTwo,
    getGameByUser,
    getGameByCode,
  },
  {
    isLoading: true,
    normalQuestions: [{ question: "" }],
    rushQuestions: [{ question: "" }],
    addingResults: true,
    gettingData: true,
  }
);
