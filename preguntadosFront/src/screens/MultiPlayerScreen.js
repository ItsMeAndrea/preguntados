import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Spinner,
} from "native-base";
import { Share, Modal, View } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";

const MultiPlayerScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputGameCode, setInputGameCode] = useState("");
  const [isGameValid, setIsGameValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    getNormalQuestions,
    createMulltiplayer,
    getGameByCode,
    state: { gameInfo, noGameAlert, gettingData },
  } = useContext(TriviaContext);

  const checkGame = () => {
    console.log("checkgame", noGameAlert);
    if (gameInfo) {
      if (gameInfo.player_two) {
        setIsGameValid(false);
        setErrorMessage("El juego ya ha terminado");
      } else {
        setIsGameValid(true);
      }
    } else {
      if (noGameAlert) {
        setIsGameValid(false);
        setErrorMessage(noGameAlert);
      }
    }
  };

  useEffect(() => {
    checkGame();
  }, [gameInfo, noGameAlert]);
  const generateCode = () => {
    var length = 5;
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const shareCode = async () => {
    const gameCode = generateCode();
    try {
      const result = await Share.share({
        message: `Juguemos Preguntados a traves de este codigo: ${gameCode}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          createMulltiplayer({ game_code: gameCode });
          getNormalQuestions();

          navigation.navigate("Question", {
            normalMode: true,
            playerOne: true,
            multiplayer: true,
            gameCode,
          });

          // shared with activity type of result.activityType
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const enterCode = () => {
    getNormalQuestions();

    navigation.navigate("Question", {
      normalMode: true,
      multiplayer: true,
      playerOne: false,
      gameCode: inputGameCode,
    });
    setModalVisible(false);
  };

  const cleanModal = () => {
    setErrorMessage("");
    setInputGameCode("");
    setModalVisible(!modalVisible);
  };

  return (
    <Container>
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
          success
          onPress={() => shareCode()}
        >
          <Text>Crear Juego</Text>
        </Button>
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          warning
          onPress={() => setModalVisible()}
        >
          <Text>Unirse a un Juego</Text>
        </Button>
      </Content>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={() => cleanModal()}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              width: 300,
            }}
          >
            <Form style={{ width: 300, marginRight: 10, marginBottom: 10 }}>
              <Item floatingLabel>
                <Label>Ingresa el Codigo del Juego</Label>
                <Input
                  value={inputGameCode}
                  keyboardType="email-address"
                  onChangeText={(e) => setInputGameCode(e.toUpperCase())}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Item>
            </Form>
            {isGameValid ? null : (
              <Text style={{ color: "red", marginBottom: 20 }}>
                {errorMessage}
              </Text>
            )}

            {isGameValid ? (
              <Button
                rounded
                block
                success
                onPress={() => enterCode()}
                style={{ marginBottom: 20 }}
              >
                <Text>Continuar</Text>
              </Button>
            ) : (
              <Button
                rounded
                block
                warning
                onPress={() => {
                  getGameByCode({ game_code: inputGameCode });
                }}
                style={{ marginBottom: 20 }}
              >
                <Text>Validar Codigo</Text>
              </Button>
            )}

            <Button
              rounded
              block
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              light
            >
              <Text>Volver</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default MultiPlayerScreen;
