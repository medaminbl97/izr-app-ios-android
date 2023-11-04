import * as React from "react";

import logger from "./app/config/logger";

import { useFonts } from "expo-font";
import TabNav from "./app/screens/TabNav";
import LoadingScreen from "./app/screens/LoadingScreen";
import { useEffect, useState } from "react";
import { LOCATION_FOREGROUND } from "expo-permissions";
import NoInternet from "./app/screens/NoInternet";
export default function App() {
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);
  const [fontLoaded] = useFonts({
    Quran: require("./app/assets/fonts/AmiriQuran-Regular.ttf"),
    Quran2: require("./app/assets/fonts/UthmanicHafs_v2-1.ttf"),
    Kitab: require("./app/assets/fonts/Kitab-Regular.ttf"),
    Arabic_Regular: require("./app/assets/fonts/Mirza-Regular.ttf"),
    Arabic_Bold: require("./app/assets/fonts/Mirza-Bold.ttf"),
    Arabic_SemiBold: require("./app/assets/fonts/Mirza-SemiBold.ttf"),
    Arabic_Medium: require("./app/assets/fonts/Mirza-Medium.ttf"),
    OldStantard_R: require("./app/assets/fonts/OldStandardTT-Regular.ttf"),
    OldStantard_I: require("./app/assets/fonts/OldStandardTT-Italic.ttf"),
    OldStantard_B: require("./app/assets/fonts/OldStandardTT-Bold.ttf"),
    MillReg: require("./app/assets/fonts/SortsMillGoudy-Regular.ttf"),
    MillIta: require("./app/assets/fonts/SortsMillGoudy-Italic.ttf"),
    Poppins: require("./app/assets/fonts/Poppins-Regular.ttf"),
    RailwayI: require("./app/assets/fonts/Raleway-Italic.ttf"),
    RailwayB: require("./app/assets/fonts/Raleway-Bold.ttf"),
    RailwayBI: require("./app/assets/fonts/Raleway-BoldItalic.ttf"),
  });

  return !Loading && fontLoaded ? <TabNav /> : <LoadingScreen />;
}
