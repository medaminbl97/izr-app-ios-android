import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import SurahName from "./SurahName";

interface surahs_int {
  ar: string[];
  de: string[];
}

interface props {
  text: string;
  fontS: number;
  lang: string;
  names: surahs_int;
}

const QuranPage = ({ text, fontS, lang, names }: props) => {
  const surahs = text.split("--");

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {surahs.map((surah, index) => (
        <View key={index}>
          {surah.includes("{1}") && (
            <SurahName
              lang={lang}
              name_ar={names.ar[index - 1]}
              name_de={names.de[index - 1]}
            />
          )}
          <Text
            style={[
              styles.txt,
              { fontFamily: lang === "AR" ? "Quran2" : "MillReg" },
              { fontSize: fontS },
              { lineHeight: fontS + 30 },
            ]}
          >
            {surah}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default QuranPage;

const styles = StyleSheet.create({
  txt: {
    fontFamily: "kitab",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
