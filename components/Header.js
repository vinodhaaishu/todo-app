import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>My Todo App</Text>
  </View>
);

export default Header;
