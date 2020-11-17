import React from "react";
import { StyleSheet, Text, View } from "react-native";
import api from "../api/api";

const LoginScreen = () => {
  const getusers = async () => {
    const response = await api.get("/users");
    console.log(response.data);
  };

  getusers();

  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
