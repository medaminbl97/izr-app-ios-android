import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const Heading = ({ children }: props) => {
  return (
    <View
      style={{
        marginTop: 10,
        marginLeft: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "RailwayB",
          fontSize: 40,
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Heading;
