import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  Platform,
  ViewStyle,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { hash } from "react-native-fs";

interface props {
  img: string;
  style?: ViewStyle;
  shadow: boolean;
}

// format : pictureName-size-xxx-xxx.jpg

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const AppImage = ({ img, style, shadow }: props) => {
  return (
    <View
      style={[
        styles.con,
        shadow && Platform.OS === "android" && { elevation: 2 },
        shadow && { shadowOpacity: 1 },
        style,
      ]}
    >
      <View style={[styles.con2]}>
        <Image
          transition={1000}
          placeholder={blurhash}
          style={styles.img}
          source={{ uri: img }}
        />
      </View>
    </View>
  );
};

export default AppImage;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  con: {
    aspectRatio: 1 / 1.44,
    height: undefined,

    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
  },
  con2: {
    overflow: "hidden",
    borderRadius: 5,
    elevation: 5,
  },
});
