import { ImageProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import CardDetailsScreen from "./CardDetailsScreen";
import colors from "../config/colors";
import QuranList from "./QuranList";
import QuranPage from "../components/QuranPage";
import QuranScreen from "./QuranScreen";

export type QuranStackParamList = {
  SurahsList: undefined;
  Quran: { page: number };
};

export type SurahsListP = NativeStackScreenProps<
  QuranStackParamList,
  "SurahsList"
>;
export type QuranP = NativeStackScreenProps<QuranStackParamList, "Quran">;

const Stack = createNativeStackNavigator<QuranStackParamList>();
export const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SurahsList"
        component={QuranList}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Quran"
        component={QuranScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackNav></StackNav>
    </NavigationContainer>
  );
};

export default HomeStack;
