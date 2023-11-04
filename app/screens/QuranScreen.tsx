import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import QuranCard from "../components/QuranCard";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
import colors from "../config/colors";
import useQuran from "../hooks/useQuran";
import { QuranP } from "./QuranStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JSONArray, JSONObject, JSONValue } from "@expo/json-file";

import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "./NoInternet";

const QuranScreen = ({ route }: QuranP) => {
  const [pageNumber, setPageNumber] = useState(route.params.page);
  const [lang, setLang] = useState("AR");
  const [size, setSize] = useState(20);
  const [bookMark, setbookMark] = useState(0);

  useEffect(() => {
    console.log("onQuranScreen");
    getData();
  });

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

  const toggle = () => {
    if (lang === "AR") {
      setLang("DE");
    } else {
      setLang("AR");
    }
  };

  const netInfo = useNetInfo();

  return (
    <Screen>
      {netInfo.isInternetReachable ? (
        <View style={styles.con}>
          <View style={{ flex: 18 }}>
            <QuranCard page={pageNumber} lang={lang} size={size} />
          </View>
          <View style={styles.footer}>
            <AntDesign
              onPress={() => {
                setPageNumber(
                  lang === "AR"
                    ? pageNumber < 604
                      ? pageNumber + 1
                      : pageNumber
                    : pageNumber > 1
                    ? pageNumber - 1
                    : pageNumber
                );
              }}
              name="leftcircle"
              color={colors.primary}
              size={35}
            />
            <AntDesign
              onPress={() => {
                setPageNumber(
                  lang === "AR"
                    ? pageNumber > 1
                      ? pageNumber - 1
                      : pageNumber
                    : pageNumber < 604
                    ? pageNumber + 1
                    : pageNumber
                );
              }}
              name="rightcircle"
              color={colors.primary}
              size={35}
            />
            <View style={styles.langStyle} onTouchStart={toggle}>
              <Text style={{ color: colors.white }}>
                {lang === "AR" ? "DE" : "AR"}
              </Text>
            </View>
            <View
              style={styles.langStyle}
              onTouchStart={() => setSize(size + 1)}
            >
              <Text style={{ color: colors.white }}>+</Text>
            </View>
            <View
              style={styles.langStyle}
              onTouchStart={() => setSize(size - 1)}
            >
              <Text style={{ color: colors.white }}>-</Text>
            </View>
            <View
              style={styles.langStyle}
              onTouchStart={() => setPageNumber(bookMark)}
            >
              <FontAwesome name="bookmark" color={"white"} size={20} />
            </View>
          </View>
        </View>
      ) : (
        <NoInternet />
      )}
    </Screen>
  );
};

export default QuranScreen;

const styles = StyleSheet.create({
  con: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 5,
  },
  footer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 5,
    paddingRight: 5,
    gap: 10,
  },
  langStyle: {
    width: 35,
    height: 35,
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
