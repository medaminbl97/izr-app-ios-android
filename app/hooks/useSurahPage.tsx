import axios from "axios";
import { useState, useEffect } from "react";

export interface aya {
  text: string;
  surah: {
    number: number;
    name: string;
    numberOfAyahs: number;
    englishName: string;
  };
  numberInSurah: number;
  juz: number;
}

interface ApiResponse {
  data: { page: number };
}

// de api : https://api.alquran.cloud/v1/page/1/de.khoury

function useSurahPage(surah: number, fetch: boolean) {
  // const [Page, setPage] = useState<QuranPage>();
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      "https://api.alquran.cloud/v1/ayah/" + surah + ":1/quran-uthmani";
    setLoading(true);
    axios
      .get<ApiResponse>(url)
      .then((res) => {
        setPage(res.data.data.page);
        console.log(url);
        console.log("page :" + res.data.data.page);
        console.log("Number :" + surah);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error useSurahPage:", error);
      });
  }, [fetch]);
  return { Loading, page };
}

export default useSurahPage;
