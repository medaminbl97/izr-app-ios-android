import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { surah } from "../hooks/useSurah";
import colors from "../config/colors";
import useSurahPage from "../hooks/useSurahPage";
import { getPageNumber } from "quran-db/app";

interface props {
  surah: surah;
  onPress: (page: number) => void;
}

const SurahItem = ({ surah, onPress }: props) => {
  const [fetch, setFetch] = useState(false);
  // const { page } = useSurahPage(surah.number, fetch);
  return (
    <View>
      <Pressable
        style={styles.con}
        onPress={() => {
          onPress(getPageNumber(surah.number, 1));
          console.log(getPageNumber(surah.number, 1));
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "Poppins" }}>
          {" "}
          {surah?.number}
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "Poppins" }}>
          {" "}
          {surah?.englishName}
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "Poppins" }}>
          {" "}
          {surah?.numberOfAyahs}
        </Text>
        <Text style={{ marginTop: 5, fontSize: 22, fontFamily: "Kitab" }}>
          {" "}
          {surah?.name}
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "Poppins" }}>
          {" "}
          {surah?.number}
        </Text>
      </Pressable>
    </View>
  );
};

export default SurahItem;

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    margin: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#D2E8E3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 2,
    width: "100%",
  },
});
