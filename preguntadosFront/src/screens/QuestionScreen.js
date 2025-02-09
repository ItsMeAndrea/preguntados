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
  const normalMode = navigation.getParam("normalMode");

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
      // Se evalua el modo de juego y se obtienen las respuestas respectivas
      const correctAnwer = normalMode
        ? normalQuestions[currentQuestion].correct_answer
        : rushQuestions[currentQuestion].correct_answer;
      const incorrectAnswers = normalMode
        ? normalQuestions[currentQuestion].incorrect_answers
        : rushQuestions[currentQuestion].incorrect_answers;

      //Se agrega la respuesta correcta al array de respuestas incorrectas
      const answersArray = [...incorrectAnswers, correctAnwer];

      //Ordena de forma random el array
      for (let i = answersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
      }

      return answersArray;
    }
  };

  //Evalua la respuesta escogida con la correcta
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
      //Evalua si es modo Normal
      if (normalMode) {
        //Evalua si se alcanzaron las 10 pregunta. Se gana el juego
        if (currentQuestion === 9) {
          //Se envian los datos a la db
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
        //Si es Modo Rush, aumenta el contador y ejecuta la funcion que
        //aumenta el tiempo
      } else {
        setCurrentQuestion(currentQuestion + 1);
        handleRushMode();
      }
      //Si la respuesta es incorrecta
    } else {
      //Evalua si es Modo Normal
      if (normalMode) {
        //Detiene el timer y se envian los datos a la db
        stoptimer();
        addToNormalLeaderboard({
          username,
          questions: currentQuestion,
          gameWon: false,
        });

        //Si es Modo Rush
      } else {
        //Detiene el timer y se envian los datos a la db
        stoptimer();
        addToRushLeaderboard({
          username,
          questions: currentQuestion,
          gameWon: false,
        });
      }
    }
  };

  //Evalua si el juego es Normal o Rush y le da formato a las preguntas
  // devuelve el string de la pregunta
  const showQuestions = () => {
    if (normalMode) {
      return normalQuestions[currentQuestion].question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&oacute;/g, "ó")
        .replace(/&eacute;/g, "é");
    } else {
      return rushQuestions[currentQuestion].question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&oacute;/g, "ó")
        .replace(/&eacute;/g, "é");
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
                    /*  success={
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
                    } */
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
