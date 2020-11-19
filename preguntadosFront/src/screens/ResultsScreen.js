import React from "react";
import { Button, Container, Content, Text, H1 } from "native-base";

const ResultsScreen = ({ navigation }) => {
  const gameWon = navigation.getParam("gameWon");

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
          {gameWon ? "YOU WON!" : "YOU LOSE ):"}
        </H1>

        <Button
          onPress={() => {
            navigation.popToTop();
          }}
          rounded
          block
        >
          <Text>Go Home</Text>
        </Button>
      </Content>
    </Container>
  );
};

ResultsScreen.navigationOptions = {
  headerShown: false,
};

export default ResultsScreen;
