import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";

import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import arabic_en from "react-date-object/locales/arabic_en";

function useDate(refresh: boolean) {
  const [date, setDate] = useState(new DateObject());
  const [hijridate, setHijriDate] = useState(
    new DateObject({ calendar: arabic, locale: arabic_en })
  );

  const navigation = useNavigation();

  const [isRamadan, setRamdan] = useState(false);
  const [isEidKbir, setEidKbir] = useState(false);
  const [isEidSghir, setEidSghir] = useState(false);
  const [todayDate, setTodayDate] = useState({ ar: "", en: "" });

  useEffect(() => {
    const newDate = new DateObject({ calendar: arabic, locale: arabic_en });
    // newDate.setDate("1443/12/11");
    // setHijriDate(newDate);
    setHijriDate(new DateObject({ calendar: arabic, locale: arabic_en }));
    setDate(new DateObject());
    console.log(hijridate.date);
    console.log(date.format());

    setTodayDate({
      ar: hijridate.format("dddd DD MMMM YYYY"),
      en: date.format("dddd DD MMMM YYYY"),
    });
    console.log("refresh dates");
    setRamdan("9" === hijridate.format("M"));
    setEidKbir(
      "12" === hijridate.format("MM") &&
        hijridate.format("DD") <= "13" &&
        hijridate.format("DD") >= "10"
    );
    setEidSghir(
      "10" === hijridate.format("MM") && hijridate.format("DD") <= "03"
    );
  }, [refresh]);

  // setTodayDate([
  //   myData?.hijri.day +
  //     " " +
  //     myData?.hijri.month.ar +
  //     " " +
  //     myData?.hijri.year,
  //   myData?.gregorian.day +
  //     " " +
  //     myData?.gregorian.month.en +
  //     " " +
  //     myData?.gregorian.year,
  // ]);
  // console.log(todayDate);
  // // console.log(isEidKbir);
  // // console.log(isEidSghir);
  // // console.log(isRamadan);

  return { isRamadan, isEidKbir, isEidSghir, todayDate };
}

export default useDate;
