import React, { useContext, useState } from "react";
import {
  Text,
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { Share, Modal, View } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";

const MultiPlayerScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputGameCode, setInputGameCode] = useState("");
  const { getNormalQuestions, createMulltiplayer } = useContext(TriviaContext);
  const generateCode = () => {
    var length = 5;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
            <Form style={{ width: 300, marginRight: 10, marginBottom: 20 }}>
              <Item floatingLabel>
                <Label>Ingresa el Codigo del Juego</Label>
                <Input
                  value={inputGameCode}
                  keyboardType="email-address"
                  onChangeText={(e) => setInputGameCode(e)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Item>
            </Form>

            <Button
              rounded
              block
              style={{ marginBottom: 20 }}
              onPress={() => setModalVisible(!modalVisible)}
              light
            >
              <Text>Volver</Text>
            </Button>
            <Button rounded block success onPress={() => enterCode()}>
              <Text>Continuar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default MultiPlayerScreen;
