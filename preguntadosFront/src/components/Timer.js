import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";

const Timer = ({ navigation }) => {
  const [time, setTime] = useState(10);

  return <Text style={{ textAlign: "right", fontSize: 25 }}>{time}''</Text>;
};

export default Timer;
