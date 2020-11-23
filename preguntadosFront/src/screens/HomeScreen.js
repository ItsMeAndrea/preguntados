import React, { useContext } from "react";
import { Text, Button, Container, Content } from "native-base";
import { StyleSheet } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as TriviaContext } from "../context/TriviaContext";

const HomeScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const {
    getNormalQuestions,
    getRushQuestions,
    getNormalLeaderboard,
    getRushLeaderboard,
  } = useContext(TriviaContext);

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
            navigation.navigate("Question", { gameMode: "normal" });
          }}
          warning
        >
          <Text>Modo Normal</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          onPress={() => {
            getRushQuestions();
            navigation.navigate("Question", { gameMode: "rush" });
          }}
          danger
        >
          <Text>Modo Rush</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          onPress={() => {
            navigation.navigate("Question", { gameMode: "multi" });
          }}
          info
        >
          <Text>Modo Multijugador</Text>
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

HomeScreen.navigationOptions = {
  headerTitle: "Preguntados",
};

export default HomeScreen;

const styles = StyleSheet.create({});
