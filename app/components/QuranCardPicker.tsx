import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";

interface props {
  juz: number;
  name: string;
  englishName: string;
  page: number;
  lang: string;
  bookMark: number;
  storeData: (page: number) => void;
}

const QuranCardPicker = ({
  juz,
  englishName,
  name,
  page,
  lang,
  bookMark,
  storeData,
}: props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: expanded ? "flex-start" : "center",
          gap: 40,
          padding: 5,
          backgroundColor: colors.primary,
          borderRadius: 20,
          // height: expanded ? 150 : 30,
          height: expanded ? 150 : Platform.OS === "ios" ? 45 : 45,
        }}
      >
        <Text
          style={{
            fontFamily: "Arabic_Regular",
            fontSize: 20,
            color: colors.white,
          }}
        >
          {lang === "AR" ? name : englishName}
        </Text>
        <Text
          style={{
            fontFamily: "Arabic_Regular",
            fontSize: 20,
            color: colors.white,
          }}
        >
          {page}
        </Text>
        <Text
          style={{
            fontFamily: "Arabic_Regular",
            fontSize: 20,
            color: colors.white,
          }}
        >
          {lang === "AR" ? " جزء" + juz : "Teil " + juz}
        </Text>
        {page === bookMark ? (
          <FontAwesome
            name="bookmark"
            size={30}
            style={{ paddingRight: 10 }}
            onPress={() => {
              storeData(0);
            }}
            color={colors.white}
          />
        ) : (
          <FontAwesome
            name="bookmark-o"
            size={30}
            style={{ paddingRight: 10 }}
            onPress={() => {
              storeData(page);
            }}
            color={colors.white}
          />
        )}
      </View>
    </View>
  );
};

export default QuranCardPicker;

const styles = StyleSheet.create({});
