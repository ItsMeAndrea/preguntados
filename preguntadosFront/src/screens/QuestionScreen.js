import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Spinner,
  Icon,
} from "native-base";
import Timer from "react-compound-timer";
import { Grid, Row, Col } from "react-native-easy-grid";
import { StyleSheet } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";
import { Context as AuthContext } from "../context/AuthContext";

const QuestionScreen = ({ navigation }) => {
  const {
    state: { username },
  } = useContext(AuthContext);
  const {
    getNormalQuestions,
    state,
    handleExitGame,
    addToLeaderboard,
  } = useContext(TriviaContext);
  const { normalQuestions, isLoading, isGameOver } = state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stoptimer, setStopTimer] = useState("");

  useEffect(() => {
    getNormalQuestions();
    navigation.navigate("Question", { handleExitGame });
  }, []);

  if (isLoading) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  const handleAnswers = () => {
    if (!isLoading) {
      const correctAnwer = normalQuestions[currentQuestion].correct_answer;
      const incorrectAnswers =
        normalQuestions[currentQuestion].incorrect_answers;

      const answersArray = [...incorrectAnswers, correctAnwer];

      for (let i = answersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
      }

      return answersArray;
    }
  };

  const checkAnswer = (answer) => {
    if (answer === normalQuestions[currentQuestion].correct_answer) {
      return true;
    } else {
      return false;
    }
  };

  const handleQuestions = (answer) => {
    console.log(username, "username");
    const isAnswerCorrect = checkAnswer(answer);
    if (isAnswerCorrect) {
      if (currentQuestion === 9) {
        console.log("GANASTE");
        addToLeaderboard({ username, time: "20" });
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      stoptimer();
      navigation.navigate("Results", { gameWon: false });
      console.log("PERDISTE wrong");
    }
  };

  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          marginHorizontal: 30,
        }}
      >
        <Grid>
          <Row size={1}>
            <Col style={{ alignSelf: "center" }}>
              <Timer
                initialTime={60 * 1000}
                timeToUpdate={10}
                direction="backward"
                checkpoints={[
                  {
                    time: 0,
                    callback: () =>
                      navigation.navigate("Results", { gameWon: false }),
                  },
                ]}
              >
                {({ stop }) => (
                  <Text style={{ fontFamily: "Helvetica Neue" }}>
                    {setStopTimer(() => stop)}
                    <Text style={{ fontSize: 32 }}>
                      <Timer.Seconds />
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      <Timer.Milliseconds />
                    </Text>
                  </Text>
                )}
              </Timer>
              <Card>
                <CardItem>
                  <Body>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        textAlign: "center",
                      }}
                    >
                      {state.normalQuestions[currentQuestion].question
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "'")
                        .replace(/&amp;/g, "&")}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </Col>
          </Row>
          <Row size={2}>
            <Col>
              {handleAnswers().map((answer, index) => {
                return (
                  <Button
                    key={index}
                    rounded
                    block
                    style={{ marginBottom: 20 }}
                    onPress={() => handleQuestions(answer, username)}
                    success={
                      answer ===
                        normalQuestions[currentQuestion].correct_answer && true
                    }
                    danger={
                      !(
                        answer ===
                        normalQuestions[currentQuestion].correct_answer
                      ) && true
                    }
                  >
                    <Text>{answer.replace(/&#039;/g, "'")}</Text>
                  </Button>
                );
              })}
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

QuestionScreen.navigationOptions = ({ navigation }) => {
  const handleExitGame = navigation.getParam("handleExitGame");

  return {
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          handleExitGame();
          navigation.navigate("Home");
        }}
      >
        <Text>Back</Text>
      </Button>
    ),
  };
};

export default QuestionScreen;

const styles = StyleSheet.create({});
