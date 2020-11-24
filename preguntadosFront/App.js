import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { setNavigator } from "./src/navigationRef";

//Provider
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TriviaProvider } from "./src/context/TriviaContext";

//Screens
import HomeScreen from "./src/screens/HomeScreen";
import LeaderNormalScreen from "./src/screens/LeaderNormalScreen";
import LeaderRushScreen from "./src/screens/LeaderRushScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import QuestionScreen from "./src/screens/QuestionScreen";
import ResultsScreen from "./src/screens/ResultsScreen";
import MultiPlayerScreen from "./src/screens/MultiPlayerScreen";
import MultiplayerResultScreen from "./src/screens/MultiplayerResultScreen";

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignUpScreen,
    Login: LoginScreen,
  }),
  mainFlow: createStackNavigator({
    Home: HomeScreen,
    Question: QuestionScreen,
    Results: ResultsScreen,
    LeaderNormal: LeaderNormalScreen,
    LeaderRush: LeaderRushScreen,
    MultiPlayer: MultiPlayerScreen,
    MultiplayerResults: MultiplayerResultScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TriviaProvider>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </TriviaProvider>
  );
};
