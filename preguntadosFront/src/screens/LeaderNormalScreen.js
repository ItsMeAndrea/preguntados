import React, { useContext, useEffect } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  H1,
  Spinner,
  Button,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, View } from "react-native";

import { Context as TriviaContext } from "../context/TriviaContext";

const LeaderNormalScreen = ({ navigation }) => {
  const {
    state: { isLoading, normalLeaderboard },
    handleExitGame,
  } = useContext(TriviaContext);

  if (isLoading) {
    return <Spinner color="blue" style={{ alignSelf: "center" }} />;
  }

  useEffect(() => {
    navigation.navigate("LeaderNormal", { handleExitGame });
  }, []);

  return (
    <Container>
      <Content style={{ marginHorizontal: 20 }}>
        <H1 style={{ alignSelf: "center", marginBottom: 20 }}>
          Normal Mode Leaderbaord
        </H1>
        <Grid>
          <Row>
            <Col>
              <Text>Username</Text>
            </Col>
            <Col>
              <Text style={{ alignSelf: "flex-end" }}>Questions</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <List>
                {normalLeaderboard.map((data, index) => (
                  <ListItem
                    key={index}
                    style={{ alignContent: "space-between" }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",

                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{data.username}</Text>
                      <Text>{data.questions}</Text>
                    </View>
                  </ListItem>
                ))}
              </List>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

LeaderNormalScreen.navigationOptions = ({ navigation }) => {
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
    title: "Normal Mode",
  };
};

export default LeaderNormalScreen;

const styles = StyleSheet.create({});
