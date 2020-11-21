import React, { useContext, useState } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Button,
  H1,
  H2,
  Label,
} from "native-base";

import NavLink from "../components/NavLink";

import { Context as AuthContext } from "../context/AuthContext";

const SignUpScreen = () => {
  const { signin, state, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container style={{ flex: 1 }}>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <H1 style={{ alignSelf: "center", marginBottom: 20 }}>Preguntados</H1>
        <H2 style={{ alignSelf: "center" }}>Crear Usuario</H2>
        <Form style={{ marginRight: 10 }}>
          <Item floatingLabel>
            <Label>Correo Electronico</Label>
            <Input
              value={email}
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Item floatingLabel>
            <Label>Nombre de usuario</Label>
            <Input
              value={username}
              keyboardType="default"
              onChangeText={(e) => setUsername(e)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Item floatingLabel>
            <Label>Contraseña</Label>
            <Input
              value={password}
              secureTextEntry={true}
              keyboardType="default"
              onChangeText={(e) => setPassword(e)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
        </Form>
        {state.errorMessage ? (
          <Text style={{ color: "red", marginLeft: 20, marginTop: 20 }}>
            {state.errorMessage}
          </Text>
        ) : null}
        <Button
          rounded
          block
          style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 30 }}
          onPress={() => {
            signin({ email, password, username });
          }}
        >
          <Text>Registrarse</Text>
        </Button>
        <NavLink
          routeName="Login"
          text="¿Ya estas Resgitrado? Inicia Sesion"
          navStyle={{ alignSelf: "center", marginBottom: 50 }}
          changeScreen={clearErrorMessage}
        />
      </Content>
    </Container>
  );
};

SignUpScreen.navigationOptions = {
  headerShown: false,
};

export default SignUpScreen;
