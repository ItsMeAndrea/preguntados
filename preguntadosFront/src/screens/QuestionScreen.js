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
    state,
    handleExitGame,
    addToNormalLeaderboard,
    addToRushLeaderboard,
  } = useContext(TriviaContext);
  const { normalQuestions, isLoading, rushQuestions } = state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stoptimer, setStopTimer] = useState("");
  const [getActualTime, setGetActualTime] = useState("");
  const [updateTime, setUpdateTime] = useState(0);
  const [addTime, setAddTime] = useState("");

  const normalMode = navigation.getParam("normalMode");

  useEffect(() => {
    navigation.navigate("Question", { handleExitGame });
  }, []);

  if (isLoading) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  const handleAnswers = () => {
    if (!isLoading) {
      const correctAnwer = normalMode
        ? normalQuestions[currentQuestion].correct_answer
        : rushQuestions[currentQuestion].correct_answer;
      const incorrectAnswers = normalMode
        ? normalQuestions[currentQuestion].incorrect_answers
        : rushQuestions[currentQuestion].incorrect_answers;

      const answersArray = [...incorrectAnswers, correctAnwer];

      for (let i = answersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
      }

      return answersArray;
    }
  };

  const checkAnswer = (answer) => {
    if (normalMode) {
      if (answer === normalQuestions[currentQuestion].correct_answer) {
        return true;
      } else {
        return false;
      }
    } else {
      if (answer === rushQuestions[currentQuestion].correct_answer) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleRushMode = () => {
    const numberQuestion = currentQuestion + 1;
    setUpdateTime(getActualTime());

    if (numberQuestion % 5 === 0) {
      addTime(updateTime + 10 * 1000);
    }
  };

  const handleQuestions = (answer) => {
    const isAnswerCorrect = checkAnswer(answer);
    if (isAnswerCorrect) {
      if (normalMode) {
        if (currentQuestion === 9) {
          console.log("GANASTE");
          const gameTime = (60 * 1000 - getActualTime()) / 1000;

          addToNormalLeaderboard({ username, time: gameTime });
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      } else {
        setCurrentQuestion(currentQuestion + 1);
        handleRushMode();
      }
    } else {
      stoptimer();
      addToRushLeaderboard({ username, questions: currentQuestion });
      console.log("PERDISTE wrong");
    }
  };

  const showQuestions = () => {
    if (normalMode) {
      return normalQuestions[currentQuestion].question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
    } else {
      return rushQuestions[currentQuestion].question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
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
                initialTime={normalMode ? 60 * 1000 : 20 * 1000}
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
                {({ stop, getTime, setTime }) => (
                  <Text style={{ fontFamily: "Helvetica Neue" }}>
                    {
                      (setStopTimer(() => stop),
                      setGetActualTime(() => getTime),
                      setAddTime(() => setTime))
                    }
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
                      {showQuestions()}
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
                      normalMode
                        ? answer ===
                            normalQuestions[currentQuestion].correct_answer &&
                          true
                        : answer ===
                            rushQuestions[currentQuestion].correct_answer &&
                          true
                    }
                    danger={
                      normalMode
                        ? !(
                            answer ===
                            normalQuestions[currentQuestion].correct_answer
                          ) && true
                        : !(
                            answer ===
                            rushQuestions[currentQuestion].correct_answer
                          ) && true
                    }
                  >
                    <Text>
                      {answer.replace(/&#039;/g, "'").replace(/&amp;/g, "&")}
                    </Text>
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
          navigation.popToTop();
        }}
      >
        <Text>Back</Text>
      </Button>
    ),
  };
};

export default QuestionScreen;

const styles = StyleSheet.create({});
