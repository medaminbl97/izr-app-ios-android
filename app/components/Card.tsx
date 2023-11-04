import {
  ImageProps,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import AppImage from "./AppImage";

interface props {
  image: string;
  title: string;
  Subtitle?: string;
  onPress: () => void;
  shadow: boolean;
}

const Card = ({ image, title, Subtitle, onPress, shadow }: props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
    >
      <AppImage img={image} shadow={shadow} />

      {title && (
        <View style={styles.txtContainer}>
          <Text
            style={{
              fontSize: 30,
              color: colors.white,
              fontFamily: "RailwayB",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: colors.white,
              fontFamily: "Poppins",
            }}
          >
            {Subtitle}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 3,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,

    borderWidth: 1,
  },
  txtContainer: {
    marginTop: 10,
  },
  link: {
    padding: 10,
  },
});
