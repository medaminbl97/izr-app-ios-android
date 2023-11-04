import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Prayer from "./Prayer";
import { useFocusEffect } from "@react-navigation/native";
import { useScrollToTop } from "@react-navigation/native";
import useDate from "../hooks/useDate";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PrayerTimes = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  let date = new Date();
  date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); // in order to get yyyy-MM-dd format, use date. toISOString().

  const { todayDate } = useDate(refreshing);

  return (
    <ScrollView ref={ref} style={{ height: "100%" }}>
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 150 }}
          contentFit="contain"
          source={require("../assets/izr-app-logo.png")}
        />
        <Text style={{ fontSize: 20, fontFamily: "Arabic_Regular" }}>
          {todayDate.ar}
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "Poppins" }}>
          {date.toLocaleDateString()}
        </Text>

        <Text style={{ fontSize: 15, fontFamily: "OldStantard_R" }}></Text>

        <Prayer index={0}></Prayer>
        <Prayer index={1}></Prayer>
        <Prayer index={2}></Prayer>
        <Prayer index={3}></Prayer>
        <Prayer index={4}></Prayer>
        <Prayer index={5}></Prayer>
      </View>
    </ScrollView>
  );
};

export default PrayerTimes;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(255, 255, 255,0.5)",
    backgroundColor: "white",
    padding: 5,
    gap: 20,
    display: "flex",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 1,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    fontFamily: "OldStantard_B",
  },
  scialMedia: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
