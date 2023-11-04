import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  style?: TextStyle;
}
const MyText = ({ style, children }: Props) => {
  return (
    <View>
      <Text style={[style, { fontFamily: "OldStantard_R" }]}>{children}</Text>
    </View>
  );
};

export default MyText;
