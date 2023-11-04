import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";

import Constants from "expo-constants";
import colors from "../config/colors";

interface props {
  children: ReactNode;
}

function Screen({ children }: props) {
  return (
    <SafeAreaView style={styles.container}>
      {children}

      {Platform.OS === "android" && (
        <StatusBar
          backgroundColor={colors.primary}
          barStyle={"light-content"}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
