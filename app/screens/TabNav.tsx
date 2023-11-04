import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  Button,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import HomeStack, { StackNav } from "./HomeStack";
import PrayerTimesScreen from "./PrayerTimesScreen";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../config/colors";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import useDate from "../hooks/useDate";
import QuranScreen from "./QuranScreen";
import QuranStack from "./QuranStack";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TaskManager from "expo-task-manager";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import logger from "../config/logger";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const getData = async () => {
    try {
      await AsyncStorage.getItem("token", (err, token) => {
        console.log("ppp" + token! + "ppp");
      });
    } catch (e) {
      console.log("nothing to load");
    }
  };

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={colors.primary}
      ></StatusBar>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={StackNav}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                // headerShown: false,
                headerTintColor: colors.white,
                tabBarActiveTintColor: colors.primary,
                tabBarIconStyle: {
                  paddingBottom: 0,
                },
                tabBarIcon: () => (
                  <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                    source={require("../assets/logo-no-text.png")}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Gebetszeiten"
              component={PrayerTimesScreen}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: "white",
                tabBarActiveTintColor: colors.primary,
                // headerShown: false,

                tabBarIcon: () => (
                  <Image
                    style={{ width: 20, height: 25 }}
                    resizeMode="contain"
                    source={require("../assets/time.png")}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Quran"
              component={QuranStack}
              options={{
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: "white",
                // headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarIcon: () => (
                  <FontAwesome5 name="quran" size={20} color={colors.primary} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default TabNav;

const styles = StyleSheet.create({});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });

    await axios
      .post("https://izr-cloud.online/PushToken", {
        token: token,
      })
      .then((res) =>
        logger.log(
          new Error("This is a response from postin Token:" + res.data)
        )
      )
      .catch((err) =>
        logger.log("this is an error form posting token : " + err)
      );
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      console.log("granted");

      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      logger.log("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
    console.log("apns" + token);
    const resp = await axios.post(
      "https://iid.googleapis.com/iid/v1:batchImport",
      {
        application: "com.aminbl.izrApp",
        sandbox: false,
        apns_tokens: [token],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAA64i9vC8:APA91bE_ui6DO0AWwRvXDYgkZJN8d99RJryZDi6jASbekdzrSYeN4iMjEPlI8_nFMWLTHLGigewfjSsgRpK3Q4ReiRRD5-j_gNaJL1S8rDuP9VhralpDD2_o4wrDN0HMUbBzy3nd9GEz",
        },
      }
    );

    console.log("fcm" + resp.data["results"][0]["registration_token"]);

    await axios
      .post("https://izr-cloud.online/PushToken", {
        token: resp.data["results"][0]["registration_token"],
      })
      .then((res) =>
        logger.log(
          new Error("This is a response from postin Token:" + res.data)
        )
      )
      .catch((err) =>
        logger.log("this is an error form posting token : " + err)
      );
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function sendPushNotification(
  expoPushToken: string,
  body: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Islamisches Zentrum Regensburg",
    body: body,
    data: {},
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
