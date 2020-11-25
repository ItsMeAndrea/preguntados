import React, { useContext, useEffect } from "react";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Spinner,
  Button,
} from "native-base";
import { View } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";
import { Context as AuthContext } from "../context/AuthContext";

const MultiplayerResultScreen = ({ navigation }) => {
  const {
    state: { multiplayerGame, isLoading },
    handleExitGame,
  } = useContext(TriviaContext);
  const {
    state: { username },
  } = useContext(AuthContext);

  useEffect(() => {
    navigation.navigate("MultiplayerResults", { handleExitGame });
  }, []);

  const handleWin = (game) => {
    const questions_one = game.questions_one;
    const questions_two = game.questions_two;
    const player_one = game.player_one;
    const player_two = game.player_two;

    if (player_one && player_two) {
      if (questions_one > questions_two) {
        if (username === player_one) {
          return "!Has ganado!";
        } else {
          return "¡Has pedido!";
        }
      } else if (questions_one < questions_two) {
        if (username === player_two) {
          return "!Has ganado!";
        } else {
          return "¡Has pedido!";
        }
      } else {
        return "¡Empate!";
      }
    } else {
      return "Esperando...";
    }
  };

  if (isLoading) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  return (
    <Container>
      <Content>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Jugador 1</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Jugador 2</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Resultado</Text>
        </View>
        <List>
          {multiplayerGame.reverse().map((game, index) => (
            <ListItem key={index}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",

                  justifyContent: "space-around",
                }}
              >
                <Text>
                  {game.questions_one} : {game.player_one}
                </Text>
                <Text>
                  {game.questions_two} : {game.player_two}
                </Text>
                <Text>{handleWin(game)}</Text>
              </View>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

MultiplayerResultScreen.navigationOptions = ({ navigation }) => {
  const handleExitGame = navigation.getParam("handleExitGame");
  return {
    title: "Resultados Multijugador",
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          handleExitGame();
          navigation.popToTop();
        }}
      >
        <Text>Back</Text>
      </Button>
    ),
  };
};

export default MultiplayerResultScreen;
