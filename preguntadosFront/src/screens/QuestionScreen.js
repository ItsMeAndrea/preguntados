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
} from "native-base";
import Timer from "react-compound-timer";
import { Grid, Row, Col } from "react-native-easy-grid";

import { Context as TriviaContext } from "../context/TriviaContext";
import { Context as AuthContext } from "../context/AuthContext";

const QuestionScreen = ({ navigation }) => {
  //Del AuthContext se obtiene el username para agregar los puntos
  // a la db
  const {
    state: { username },
  } = useContext(AuthContext);

  // Del TriviaContext se obtiene el state de la aplicacion, y las funciones
  // para: salir del juego, añadir al normal leaderboard, añadir al
  // rush leaderboard
  const {
    state,
    handleExitGame,
    addToNormalLeaderboard,
    addToRushLeaderboard,
  } = useContext(TriviaContext);

  //Se declaran los estados iniciales de la vista
  const { normalQuestions, isLoading, rushQuestions } = state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stoptimer, setStopTimer] = useState("");
  const [getActualTime, setGetActualTime] = useState("");
  const [updateTime, setUpdateTime] = useState(0);
  const [addTime, setAddTime] = useState("");

  //Se obtienen los parametros de la navegacion
  const gameMode = navigation.getParam("gameMode");

  //El useEffect se utiliza para ejecutar una funcion antes de que
  // se renderice la vista. En este caso se usa para pasar la funcion
  // handleExitGame al header a traves de los parametros de navegacion
  // para poder utilizar el boton de "Back" (VER AL FINAL)
  useEffect(() => {
    navigation.navigate("Question", { handleExitGame });
  }, []);

  //Evalua si se esta cargando la data, mientras se carga se muestra
  //un Spinner
  if (isLoading) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  //Devuelve el array de las respuesta
  const handleAnswers = () => {
    //Si ya se cargo la data
    if (!isLoading) {
      let correctAnwer = "",
        incorrectAnswers = [],
        answersArray = [];
      switch (gameMode) {
        case "normal":
          // Se evalua el modo de juego y se obtienen las respuestas respectivas
          correctAnwer = normalQuestions[currentQuestion].correct_answer;
          incorrectAnswers = normalQuestions[currentQuestion].incorrect_answers;

          //Se agrega la respuesta correcta al array de respuestas incorrectas
          answersArray = [...incorrectAnswers, correctAnwer];

          //Ordena de forma random el array
          for (let i = answersArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answersArray[i], answersArray[j]] = [
              answersArray[j],
              answersArray[i],
            ];
          }

          return answersArray;

        case "rush":
          // Se evalua el modo de juego y se obtienen las respuestas respectivas
          correctAnwer = rushQuestions[currentQuestion].correct_answer;
          incorrectAnswers = rushQuestions[currentQuestion].incorrect_answers;

          //Se agrega la respuesta correcta al array de respuestas incorrectas
          answersArray = [...incorrectAnswers, correctAnwer];

          //Ordena de forma random el array
          for (let i = answersArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answersArray[i], answersArray[j]] = [
              answersArray[j],
              answersArray[i],
            ];
          }

          return answersArray;

        case "multi":
          console.log("multi");
          break;
        default:
          gameMode;
      }
    }
  };

  //Evalua la respuesta escogida con la correcta
  const checkAnswer = (answer) => {
    switch (gameMode) {
      case "normal":
        return answer === normalQuestions[currentQuestion].correct_answer;
      case "rush":
        return answer === rushQuestions[currentQuestion].correct_answer;
      case "multi":
        console.log("multi answers");
    }
  };

  //Maneja el tiempo en el modo Rush
  const handleRushMode = () => {
    //Pregunta actual
    const numberQuestion = currentQuestion + 1;
    //Se obtiene el tiempo del timer
    setUpdateTime(getActualTime());

    //Si la pregunta es multiplo de 5, se agregan 10s al timer
    if (numberQuestion % 5 === 0) {
      addTime(updateTime + 10 * 1000);
    }
  };

  //Maneja lo que pasa cuando se contesta una pregunta
  const handleQuestions = (answer) => {
    //Si es correcto true, si no false
    const isAnswerCorrect = checkAnswer(answer);

    //Evalua si la respuesta es correcta
    if (isAnswerCorrect) {
      switch (gameMode) {
        case "normal":
          if (currentQuestion === 9) {
            //Se envian los datos a la db
            stoptimer();

            addToNormalLeaderboard({
              username,
              questions: currentQuestion + 1,
              gameWon: true,
            });
            //Si no se ha llegado a las 10 pregunta, va aumentado el
            //contador de currentQuestion
          } else {
            setCurrentQuestion(currentQuestion + 1);
          }
          break;
        case "rush":
          setCurrentQuestion(currentQuestion + 1);
          handleRushMode();
          break;
      }
    } else {
      switch (gameMode) {
        case "normal":
          stoptimer();
          addToNormalLeaderboard({
            username,
            questions: currentQuestion,
            gameWon: false,
          });
          break;

        case "rush":
          stoptimer();
          addToRushLeaderboard({
            username,
            questions: currentQuestion,
            gameWon: false,
          });
          break;
      }
    }
  };

  //Evalua si el juego es Normal o Rush y le da formato a las preguntas
  // devuelve el string de la pregunta
  const showQuestions = () => {
    switch (gameMode) {
      case "normal":
        return normalQuestions[currentQuestion].question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&oacute;/g, "ó")
          .replace(/&eacute;/g, "é");
      case "rush":
        return rushQuestions[currentQuestion].question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&oacute;/g, "ó")
          .replace(/&eacute;/g, "é");
    }
  };

  const setGameTime = () => {
    switch (gameMode) {
      case "normal":
        return 60 * 1000;
      case "rush":
        return 20 * 1000;
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
                initialTime={setGameTime()}
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
                      gameMode === "normal"
                        ? answer ===
                            normalQuestions[currentQuestion].correct_answer &&
                          true
                        : answer ===
                            rushQuestions[currentQuestion].correct_answer &&
                          true
                    }
                    danger={
                      gameMode === "normal"
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
