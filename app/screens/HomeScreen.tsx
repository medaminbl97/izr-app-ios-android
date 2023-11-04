import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Card from "../components/Card";
import Heading from "../components/Heading";
import WelcomeCard from "../components/WelcomeCard";
import { useScrollToTop } from "@react-navigation/native";
import { HomeP } from "./HomeStack";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import logger from "../config/logger";
import NoInternet from "./NoInternet";
import { registerForPushNotificationsAsync } from "./TabNav";
import messaging from "@react-native-firebase/messaging";

export interface EventsFyler {
  flyer: string;
  description: string;
  title: string;
  subtitle: string;
  link: string;
  date: string;
  id: number;
}

interface ApiResponse {
  events: EventsFyler[];
}

export default function HomeScreen({ navigation }: HomeP) {
  const ref = React.useRef(null);
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = React.useState(false);
  const [reloadEvents, setReloadEvents] = useState(false);
  const [Flyers, setFlyers] = useState<EventsFyler[]>();
  const [length, setLength] = useState(0);

  const storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    logger.log("grade beim use effect wo token gefragt wird");
    try {
      registerForPushNotificationsAsync().then((token) => {
        storeData(token!);
      });
    } catch (error) {
      logger.log("Error from taking permission :" + error);
    }
    logger.log("try catch block ist vorbei");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get<ApiResponse>("https://izr-cloud.online/getEvents/all")
        .then((res) => {
          setFlyers(res.data.events);
          setLength(res.data.events.length);
          console.log(length);
        })

        .catch((error) => {
          console.error("Axios Error:", error);
        });
    }, [refreshing])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useScrollToTop(ref);

  useEffect(() => {
    // getToken();
  }, []);

  const getToken = async () => {
    console.log("getToken Begine");
    try {
      const value = await AsyncStorage.getItem("token");
      setTimeout(() => {
        const obj = JSON.parse(value!);
        console.log(JSON.parse(value!));
      }, 1000);
    } catch (e) {
      console.log("nothing to load");
    }
    console.log("getToken End");
  };
  return (
    <Screen>
      {netInfo.isInternetReachable ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={ref}
          style={{ backgroundColor: "white", height: "100%" }}
        >
          {/* <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(token, "Hellow");
          }}
        /> */}
          <WelcomeCard />
          <Heading>Veranstalungen</Heading>

          {Flyers?.map((event) => (
            <Card
              key={event.id}
              shadow={false}
              onPress={() =>
                event.description &&
                navigation.navigate("Informationen", {
                  name: event?.title,
                  img: event?.flyer!,
                  text: event?.description,
                  link: event?.link,
                })
              }
              image={event?.flyer!}
              title={event.title}
              Subtitle={event.subtitle}
            />
          ))}
        </ScrollView>
      ) : (
        <NoInternet />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({});
