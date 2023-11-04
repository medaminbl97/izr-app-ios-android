import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import React from "react";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { Formik } from "formik";
const LoginScreen = () => {
  return (
    <Screen>
      <ScrollView scrollEnabled={false}>
        <View style={styles.loginCon}>
          <Image
            contentFit="contain"
            source={require("../assets/izr-app-logo.png")}
            style={{ width: 150, height: 150 }}
          ></Image>

          <Formik
            initialValues={{ userName: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
              console.log("submitt");
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <>
                <AppTextInput
                  text="username"
                  icon="account-box"
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                />
                <AppTextInput
                  onChangeText={() => handleChange("password")}
                  text="password"
                  icon="onepassword"
                  value={values.password}
                />
                <AppButton onPress={handleSubmit} title="Login" />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginCon: {
    gap: 50,
    alignItems: "center",
    marginTop: 50,
  },
});
