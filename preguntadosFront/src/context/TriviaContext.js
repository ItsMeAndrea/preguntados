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
        isGameOver: false,
      };
    case "exit_game":
      return { isLoading: true };
    case "game_over":
      return { ...state, isGameOver: true };

    default:
      return state;
  }
};

const getNormalQuestions = (dispatch) => async () => {
  const response = await triviaApi.get("?amount=10&type=multiple");
  dispatch({ type: "get_normal_questions", payload: response.data.results });
};

const handleExitGame = (dispatch) => () => {
  dispatch({ type: "exit_game" });
};

const handleGameOver = (dispatch) => () => {
  dispatch({ type: "game_over" });
};

const addToLeaderboard = (dispatch) => async ({ username, time }) => {
  console.log(username, time, "data");
  try {
    const response = await preguntadosApi.post(
      "/api/v1/leaderboard/addNormal",
      {
        username,
        time,
      }
    );

    dispatch({ type: "exit_game" });
    navigate("Results", { gameWon: true });
  } catch (error) {
    console.log(error.response.data, "error");
  }
};

export const { Provider, Context } = createDataContext(
  triviaReducer,
  { getNormalQuestions, handleExitGame, handleGameOver, addToLeaderboard },
  { normalQuestions: [{}], isLoading: true }
);
