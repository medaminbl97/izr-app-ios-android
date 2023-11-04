import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import React, { useState } from "react";
import Heading from "../components/Heading";
import { CardDetailP } from "./HomeStack";
import AppImage from "../components/AppImage";
import Screen from "../components/Screen";
import ImageViewer from "react-native-image-zoom-viewer";
import colors from "../config/colors";

const CardDetailsScreen = ({ route }: CardDetailP) => {
  const { name, img, text, link } = route.params;
  const [visible, setVisible] = useState(false);
  const image = [
    {
      url: img,
      props: {},
    },
  ];
  return (
    <Screen>
      <View
        style={{
          backgroundColor: "#fff",
          margin: 5,
          borderRadius: 15,
          shadowColor: "grey",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 1,
        }}
      >
        <ScrollView style={styles.container}>
          <Heading>{name}</Heading>
          <Text style={styles.txt}>{text}</Text>
          {link && (
            <TouchableOpacity
              onPress={() => Linking.openURL(route.params.link)}
            >
              {route.params.link && (
                <Text style={styles.link}>
                  Mehr Infos / Anmeldung hier clicken
                </Text>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setVisible(true)}>
            <AppImage shadow={true} img={img} style={{ marginTop: 10 }} />
          </TouchableOpacity>
          <Modal visible={visible} onRequestClose={() => setVisible(false)}>
            <ImageViewer
              imageUrls={image}
              enableSwipeDown={true}
              onCancel={() => setVisible(false)}
            ></ImageViewer>
          </Modal>

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default CardDetailsScreen;

const styles = StyleSheet.create({
  txt: {
    fontSize: 15,
    // textAlign: "justify",
    fontFamily: "Poppins",
  },
  container: {
    padding: 20,
    paddingBottom: 50,
    display: "flex",
  },
  link: {
    padding: 20,
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 10,
    overflow: "hidden",
    fontFamily: "Poppins",
    margin: 10,
  },
});
