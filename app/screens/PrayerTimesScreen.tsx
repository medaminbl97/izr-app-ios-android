import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import PrayerTimes from "../components/PrayerTimes";
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "./NoInternet";

const PrayerTimesScreen = () => {
  const netInfo = useNetInfo();

  return (
    <Screen>
      {netInfo.isInternetReachable ? (
        <View>
          <PrayerTimes />
        </View>
      ) : (
        <NoInternet />
      )}
    </Screen>
  );
};

export default PrayerTimesScreen;

const styles = StyleSheet.create({});
