import createDataContext from "./createDataContext";
import triviaApi from "../api/triviaApi";
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

export const { Provider, Context } = createDataContext(
  triviaReducer,
  { getNormalQuestions, handleExitGame, handleGameOver },
  { normalQuestions: [{}], isLoading: true, isGameOver: false }
);
