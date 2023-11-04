import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PinchGestureHandler } from "react-native-gesture-handler";
import useQuran, { aya } from "../hooks/useQuran";
import QuranPage from "./QuranPage";
import Screen from "./Screen";
import colors from "../config/colors";
import QuranCardPicker from "./QuranCardPicker";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JSONArray, JSONObject, JSONValue } from "@expo/json-file";

interface props {
  page: number;
  lang: string;
  size: number;
}

const QuranCard = ({ page, lang, size }: props) => {
  const [reload, setREload] = useState(false);
  const { names, juz, pageToRender, Loading } = useQuran(page, lang);

  const [bookMark, setbookMark] = useState(0);

  useEffect(() => {
    getData();
  });

  const storeData = async (page: number) => {
    try {
      await AsyncStorage.setItem("page", JSON.stringify({ number: page }));
      const value = await AsyncStorage.getItem("page");
      const obj = JSON.parse(value!);
      console.log(JSON.parse(value!));
      setbookMark(page);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("page");
      const obj = JSON.parse(value!);
      console.log(JSON.parse(value!));
      setbookMark(obj.number);
    } catch (e) {
      console.log("nothing to load");
    }
  };

  useFocusEffect(() => {
    setREload(true);
    console.log("relode : ", reload);
    // setTimeout(() => {
    //   setREload(false);
    //   console.log("relode : ", reload);
    // }, 1000);
  });

  return (
    <View style={styles.container}>
      {Loading && <Text>Wird geladen ... </Text>}
      {!Loading && (
        <QuranCardPicker
          bookMark={bookMark}
          storeData={storeData}
          lang={lang}
          juz={juz}
          name={names.ar[0]}
          englishName={names.de[0]}
          page={page}
        />
      )}
      {!Loading && (
        <QuranPage
          lang={lang}
          names={names}
          text={pageToRender}
          fontS={size}
        ></QuranPage>
      )}
      {/* <TajweedVerse
          verse={
            "\u0671\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u0651\u064e\u0647\u0650 \u0631\u064e\u0628\u0651\u0650 [h:4[\u0671]\u0644\u0652\u0639\u064e[n[\u0640\u0670]\u0644\u064e\u0645[p[\u0650\u064a]\u0646\u064e"
          }
          config={{
            style: {
              fontSize: 28,
              lineHeight: 50,
              color: "black",
              direction: "rtl",
              fontFamily: "Quran2",
            },
          }}         />*/}
    </View>
  );
};

export default QuranCard;

const styles = StyleSheet.create({
  txt: {
    fontFamily: "Arabic_Regular",
    textAlign: "justify",
    fontSize: 20,
  },
  container: {
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: colors.white,
    padding: 5,
    margin: 5,
  },
});
