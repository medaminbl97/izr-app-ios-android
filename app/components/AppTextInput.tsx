import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";
import { TextInputProps } from "react-native-paper";

interface props {
  icon: "account-box" | "onepassword" | undefined;
  text: string;
  //   onChange: (text?: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
}

const AppTextInput = ({ icon, text, onChangeText }: props) => {
  const [bg, setBg] = useState(false);
  return (
    <View style={[styles.container, bg && { backgroundColor: "lightgrey" }]}>
      <MaterialCommunityIcons color={colors.primary} size={30} name={icon} />
      <TextInput
        onFocus={() => setBg(true)}
        onEndEditing={() => setBg(false)}
        secureTextEntry={text === "password" ? true : false}
        style={styles.txtIn}
        placeholder={text}
        autoCorrect={false}
        autoCapitalize="none"
        enablesReturnKeyAutomatically
        returnKeyType="done"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    marginVertical: 10,
  },
  txtIn: {
    marginLeft: 10,
    fontFamily: "Poppins",
    fontSize: 20,
    width: "80%",
  },
});
