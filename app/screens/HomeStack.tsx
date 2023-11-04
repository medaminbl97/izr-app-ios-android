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
import { rotationHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler";

export type RootStackParamList = {
  Startseite: { token: string };
  Informationen: { name: string; img: string; text: string; link: string };
};

export type HomeP = NativeStackScreenProps<RootStackParamList, "Startseite">;
export type CardDetailP = NativeStackScreenProps<
  RootStackParamList,
  "Informationen"
>;
const Stack = createNativeStackNavigator<RootStackParamList>();
export const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Startseite"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Informationen"
        component={CardDetailsScreen}
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
    <NavigationContainer>
      <StackNav></StackNav>
    </NavigationContainer>
  );
};

export default HomeStack;
