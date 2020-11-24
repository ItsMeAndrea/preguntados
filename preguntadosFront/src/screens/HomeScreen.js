import React, { useContext, useEffect } from "react";
import { Text, Button, Container, Content, Badge } from "native-base";
import { StyleSheet } from "react-native";

import Icon from "../components/Icon";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as TriviaContext } from "../context/TriviaContext";

const HomeScreen = ({ navigation }) => {
  const {
    signout,
    state: { username },
  } = useContext(AuthContext);
  const {
    getNormalQuestions,
    getRushQuestions,
    getNormalLeaderboard,
    getRushLeaderboard,
    getGameByUser,
  } = useContext(TriviaContext);

  useEffect(() => {
    navigation.navigate("Home", { getGameByUser, username });
  }, []);

  return (
    <Container style={{ flex: 1 }}>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          onPress={() => {
            getNormalQuestions();
            navigation.navigate("Question", { normalMode: true });
          }}
          warning
        >
          <Text>Normal</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          onPress={() => {
            getRushQuestions();
            navigation.navigate("Question", { normalMode: false });
          }}
          danger
        >
          <Text>Rush</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          info
          onPress={() => {
            navigation.navigate("MultiPlayer");
          }}
        >
          <Text>Multijugador</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          success
          onPress={() => {
            getNormalLeaderboard();
            navigation.navigate("LeaderNormal");
          }}
        >
          <Text>Normal Leaderboard</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          success
          onPress={() => {
            getRushLeaderboard();
            navigation.navigate("LeaderRush");
          }}
        >
          <Text>Rush Leaderboard</Text>
        </Button>

        <Button
          rounded
          block
          onPress={() => signout()}
          style={{ marginHorizontal: 20 }}
          light
        >
          <Text style={{ color: "white" }}>Cerrar Sesion</Text>
        </Button>
      </Content>
    </Container>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  const getGameByUser = navigation.getParam("getGameByUser");
  const username = navigation.getParam("username");
  const data = [
    /*  {
      game_code: "123",
    },
    { game_code: "456" }, */
  ];
  return {
    headerTitle: "Preguntados",
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          getGameByUser({ username });
          navigation.navigate("MultiplayerResults");
        }}
      >
        <Icon />
        {/*  <Badge
          style={{
            marginRight: 20,
            backgroundColor: `${data.length > 0 ? "red" : "gray"}`,
          }}
        >
          <Text>{data.length}</Text>
        </Badge> */}
      </Button>
    ),
  };
};

export default HomeScreen;

const styles = StyleSheet.create({});
