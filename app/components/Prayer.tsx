import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import colors from "../config/colors";
import usePrayerTime from "../hooks/usePrayerTime";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

interface props {
  index: number;
}

const Prayer = ({ index }: props) => {
  const todayPrayerTimes = usePrayerTime();

  const prayers = [
    { name: "Fajr   ", time: todayPrayerTimes?.Fajr, nameAr: " الفجر" },
    { name: "Shuruq ", time: todayPrayerTimes?.Shuruq, nameAr: "الشروق" },
    { name: "Dhuhr  ", time: todayPrayerTimes?.Dhuhr, nameAr: " الظهر" },
    { name: "Asr    ", time: todayPrayerTimes?.Asr, nameAr: "العصر" },
    { name: "Maghrib", time: todayPrayerTimes?.Maghrib, nameAr: "المغرب" },
    { name: "Ishaa  ", time: todayPrayerTimes?.Isha, nameAr: "العشاء" },
  ];

  useEffect(() => {}, []);
  return (
    <View style={styles.firstContainer}>
      <View style={styles.container}>
        <Text
          style={[
            styles.txt,
            {
              fontFamily: "OldStantard_R",
            },
          ]}
        >
          {prayers[index].name}
        </Text>

        <Text
          style={[
            styles.txt,
            {
              fontFamily: "OldStantard_R",
            },
          ]}
        >
          {prayers[index].time}
        </Text>
        <Text
          style={[
            styles.txt,
            {
              fontFamily: "Arabic_Regular",
            },
          ]}
        >
          {prayers[index].nameAr}
        </Text>
      </View>
    </View>
  );
};

export default Prayer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 5,
    borderRadius: 10,
    width: "100%",
    height: 60,
    backgroundColor: "transparent",
  },
  txt: {
    textAlign: "center",
    flex: 1,
    fontSize: 25,
    // color: "white",
  },
  firstContainer: {
    display: "flex",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 10,
    backgroundColor: "#D2E8E3",
  },
  notificationsCon: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
  },
});
