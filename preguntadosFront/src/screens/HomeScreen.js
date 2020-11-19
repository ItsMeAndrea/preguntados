import React, { useContext, useState } from "react";
import { Text, Button, Container, Content, Icon } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as TriviaContext } from "../context/TriviaContext";
import { set } from "react-native-reanimated";

const HomeScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const { getNormalQuestions, getRushQuestions } = useContext(TriviaContext);

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
          success
        >
          <Text>Leaderboard</Text>
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

/* HomeScreen.navigationOptions = () => {
  const { signout } = useContext(AuthContext);
  return {
    headerRight: () => (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => signout()}>
        <Icon name="sign-out" type="FontAwesome" />
      </TouchableOpacity>
    ),
  };
}; */

export default HomeScreen;

const styles = StyleSheet.create({});
