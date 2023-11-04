import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import logger from "../config/logger";

interface PrayerT {
  Date: string;
  Fajr: string;
  Shuruq: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

// interface Resp {
//   prayerTimesData: PrayerT;
// }

function usePrayerTime() {
  const [todayPrayerTimes, setTodayPrayerTimes] = useState<PrayerT>();

  const [fetch, setFetch] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<PrayerT>("https://izr-cloud.online/getPrayers")
      .then((res) => {
        setTodayPrayerTimes(res.data);
        console.log(
          "this a response from getPrayers : " + JSON.stringify(res.data)
        );
      })

      .catch((error) => {
        logger.log("this a error from getPrayers : " + error);
      });
  }, []);

  return todayPrayerTimes;
}

export default usePrayerTime;
