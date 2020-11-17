import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName, navStyle, changeScreen }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({ routeName });
        changeScreen();
      }}
      style={navStyle}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
    marginLeft: 15,
  },
});

export default withNavigation(NavLink);
