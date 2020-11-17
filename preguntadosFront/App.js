import { StatusBar } from "expo-status-bar";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";

//Provider
import { Provider as AuthProvider } from "./src/context/AuthContext";

//Screens
import HomeScreen from "./src/screens/HomeScreen";
import LeaderNormalScreen from "./src/screens/LeaderNormalScreen";
import LeaderRushScreen from "./src/screens/LeaderRushScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

const leaderboardFlow = createBottomTabNavigator({
  LeaderNormal: LeaderNormalScreen,
  LeaderRush: LeaderRushScreen,
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignUpScreen,
    Login: LoginScreen,
  }),
  mainFlow: createStackNavigator({
    Home: HomeScreen,
    leaderboardFlow: leaderboardFlow,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
