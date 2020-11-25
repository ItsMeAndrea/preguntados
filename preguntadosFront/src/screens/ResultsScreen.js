import React, { useContext, useState } from "react";
import { Button, Container, Content, Text, H1, Spinner } from "native-base";
import { Share } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";
import { set } from "react-native-reanimated";

const ResultsScreen = ({ navigation }) => {
  const {
    state: { addingLeaderboard, isLoading },
  } = useContext(TriviaContext);
  const normalMode = navigation.getParam("normalMode");
  const questions = navigation.getParam("questions");
  const game_code = navigation.getParam("game_code");
  const playerTwo = navigation.getParam("playerTwo");

  const [isShared, setIsShared] = useState(false);

  if (addingLeaderboard) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Alcance a responder ${questions} preguntas en Preguntados. ¿Crees que puedes superarme?`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const shareCode = async () => {
    setIsShared(true);
    try {
      const result = await Share.share({
        message: `Juguemos Preguntados a traves de este codigo: ${game_code}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const showButtons = () => {
    console.log(playerTwo, "player two");
    if (playerTwo) {
      return (
        <>
          <Button
            onPress={() => {
              onShare();
            }}
            rounded
            block
            style={{ marginBottom: 20 }}
          >
            <Text>Compartir Resultados</Text>
          </Button>
          <Button
            onPress={() => {
              navigation.popToTop();
            }}
            rounded
            block
          >
            <Text>Ir al Inicio</Text>
          </Button>
        </>
      );
    } else {
      if (isShared) {
        return (
          <>
            <Button
              onPress={() => {
                onShare();
              }}
              rounded
              block
              style={{ marginBottom: 20 }}
            >
              <Text>Compartir Resultados</Text>
            </Button>
            <Button
              onPress={() => {
                navigation.popToTop();
              }}
              rounded
              block
            >
              <Text>Ir al Inicio</Text>
            </Button>
          </>
        );
      } else {
        if (game_code) {
          return (
            <Button
              onPress={() => {
                shareCode();
              }}
              rounded
              block
              style={{ marginBottom: 20 }}
            >
              <Text>Compartir Codigo del Juego</Text>
            </Button>
          );
        } else {
          return (
            <>
              <Button
                onPress={() => {
                  onShare();
                }}
                rounded
                block
                style={{ marginBottom: 20 }}
              >
                <Text>Compartir Resultados</Text>
              </Button>
              <Button
                onPress={() => {
                  navigation.popToTop();
                }}
                rounded
                block
              >
                <Text>Ir al Inicio</Text>
              </Button>
            </>
          );
        }
      }
    }
  };

  const handleTextQuestions = () => {
    if (normalMode) {
      return (
        <Text style={{ alignSelf: "center" }}>
          ¡Acertaste {questions} de 10 preguntas!
        </Text>
      );
    } else {
      return (
        <Text style={{ alignSelf: "center" }}>
          ¡Llegaste a {questions} preguntas!
        </Text>
      );
    }
  };

  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          marginHorizontal: 20,
        }}
      >
        <H1 style={{ textAlign: "center", marginBottom: 20 }}>
          ¡Juego Finalizado!
        </H1>
        {handleTextQuestions()}
        {showButtons()}
      </Content>
    </Container>
  );
};

ResultsScreen.navigationOptions = {
  headerShown: false,
};

export default ResultsScreen;
