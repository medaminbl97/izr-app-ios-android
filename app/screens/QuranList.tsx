import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import useSurah from "../hooks/useSurah";
import { useFocusEffect } from "@react-navigation/native";
import SurahItem from "../components/SurahItem";
import { SurahsListP } from "./QuranStack";
import LottieView from "lottie-react-native";
import Screen from "../components/Screen";

const QuranList = ({ navigation }: SurahsListP) => {
  const [focus, setFocus] = useState(false);
  const { Loading, surahs } = useSurah(focus);

  useFocusEffect(() => {
    setFocus(true);
  });

  const onPress = (page: number) => {
    navigation.navigate("Quran", { page: page });
    console.log("OnPress , page: " + page);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {Loading && (
        <LottieView
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/animations/loading.json")}
        />
      )}
      {!Loading && (
        <Screen>
          <View>
            <ScrollView>
              {surahs.map((surah) => {
                return (
                  <SurahItem
                    key={surah.number}
                    onPress={onPress}
                    surah={surah}
                  />
                );
              })}
            </ScrollView>
          </View>
        </Screen>
      )}
    </View>
  );
};

export default QuranList;

const styles = StyleSheet.create({});
