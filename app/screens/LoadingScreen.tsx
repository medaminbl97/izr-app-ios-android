import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {
  return (
    <Screen>
      <View
        style={{
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/animations/loading.json")}
        />
      </View>
    </Screen>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
  },
});
