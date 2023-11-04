import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
interface surahs_int {
  ar: string[];
  de: string[];
}

interface props {
  lang: string;
  name_ar: string;
  name_de: string;
}

const SurahName = ({ lang, name_ar, name_de }: props) => {
  return (
    <View
      style={[
        styles.container,
        lang === "AR" ? { paddingBottom: 20 } : { padding: 20 },
      ]}
    >
      <Text
        style={[
          styles.txt,
          { fontFamily: lang === "AR" ? "Quran" : "MillReg" },
        ]}
      >
        {lang === "AR" ? name_ar : name_de}
      </Text>
    </View>
  );
};

export default SurahName;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  txt: {
    fontSize: 30,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
  },
});
