import axios from "axios";
import { useState, useEffect } from "react";

export interface surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: string;
}
interface ApiResponse {
  data: { surahs: { references: surah[] } };
}

// de api : https://api.alquran.cloud/v1/page/1/de.khoury

function useSurah(focus: boolean) {
  const [Loading, setLoading] = useState(true);
  const [surahs, setSurahs] = useState<surah[]>([]);

  useEffect(() => {
    const url = "https://api.alquran.cloud/v1/meta";
    setLoading(true);
    axios
      .get<ApiResponse>(url)
      .then((res) => {
        // console.log(res.data.data.surahs);
        setSurahs(res.data.data.surahs.references);
        setLoading(false);
        console.log("surahs fetched");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error useQuran:", error);
      });
  }, [focus]);
  return { Loading, surahs };
}

export default useSurah;
