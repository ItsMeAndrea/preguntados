import React, { useContext } from "react";
import { Text, Button, Container, Content, Icon } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <Container>
      <Content>
        <Text>HomeScreen</Text>
        <Button onPress={() => signout()}>
          <Text>Cerrar Sesion</Text>
        </Button>
      </Content>
    </Container>
  );
};

/* HomeScreen.navigationOptions = () => {
  const { signout } = useContext(AuthContext);
  return {
    headerRight: () => (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => signout()}>
        <Icon name="sign-out" type="FontAwesome" />
      </TouchableOpacity>
    ),
  };
}; */

export default HomeScreen;

const styles = StyleSheet.create({});
