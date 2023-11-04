import { StyleSheet, Text, View, Linking, ImageBackground } from "react-native";
import React from "react";
import logo from "../assets/basmala1.png";
import MyText from "./MyText";
import { Image } from "expo-image";
import colors from "../config/colors";

const WelcomeCard = () => {
  return (
    <ImageBackground
      source={require("../assets/basmala1.png")}
      resizeMode="contain"
      style={{ marginTop: 50, opacity: 1 }}
    >
      <View style={styles.container}>
        <Image contentFit="contain" style={styles.img} source={logo} />
        <Text style={styles.heading}>assalamualaikum</Text>
        <Text style={styles.txt}>
          Herzlich Willkommen in der App des Islamischen Zentrums Regensburg
        </Text>
      </View>
    </ImageBackground>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255,0.8)",
  },
  img: {
    width: "100%",
    height: 150,
    marginBottom: 50,
    marginTop: 50,
  },
  heading: {
    fontSize: 40,
    fontFamily: "RailwayBI",
    color: colors.primary,
  },
  txt: {
    fontSize: 18,
    fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 100,
  },
});
