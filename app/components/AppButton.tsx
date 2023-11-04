import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface props {
  title: string;
  onPress: () => void;
}

const AppButton = ({ onPress, title }: props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.con}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  con: {
    backgroundColor: colors.p1,
    width: 200,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  txt: {
    fontSize: 20,
    alignSelf: "center",
  },
});
