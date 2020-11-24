import React from "react";
import { Image } from "react-native";

function Icon() {
  return (
    <Image
      source={require(`../assets/icons/multiplayer.png`)}
      style={{ width: 32, marginRight: 20 }}
    />
  );
}

export default Icon;
