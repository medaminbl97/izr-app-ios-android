import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Screen from "../components/Screen";

import { Feather } from "@expo/vector-icons";

const NoInternet = () => {
  return (
    <Screen>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Image
          contentFit="scale-down"
          source={require("../assets/loading_Screen.png")}
          style={{ height: 400 }}
        />
        <View
          style={{ flexDirection: "column", alignItems: "center", gap: 30 }}
        >
          <Text
            style={{ fontFamily: "Poppins", fontSize: 30, textAlign: "center" }}
          >
            Sie haben keine Internetverbindung
          </Text>
          <Feather name="wifi-off" size={40} color={"green"} />
        </View>
      </View>
    </Screen>
  );
};

export default NoInternet;

const styles = StyleSheet.create({});
