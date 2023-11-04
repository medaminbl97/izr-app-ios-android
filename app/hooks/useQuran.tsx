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

interface QuranPage {
  number: number;
  ayahs: aya[];
}

interface ApiResponse {
  data: QuranPage;
}
interface surahs_int {
  ar: string[];
  de: string[];
}

// de api : https://api.alquran.cloud/v1/page/1/de.khoury

function useQuran(page: number, lang: string) {
  // const [Page, setPage] = useState<QuranPage>();
  const [Number, setNumber] = useState(0);
  const [Ayahs, setAyahs] = useState<aya[]>([]);
  const [pageToRender, setPageToRender] = useState("no_page_to_render");
  const [names, setNames] = useState<surahs_int>({ ar: [], de: [] });
  const [juz, setJuz] = useState(0);
  const [Loading, setLoading] = useState(true);

  const getPage = (ayet: aya[]) => {
    let page = "";

    const surahs: string[] = [];
    const surahs_de: string[] = [];

    ayet.map(({ text, numberInSurah, surah }) => {
      if (numberInSurah === 1) {
        page += "--" + text + " {" + numberInSurah + "} ";
        surahs.push(surah.name);
        surahs_de.push(surah.englishName);
      } else {
        page += text + " {" + numberInSurah + "} ";
      }
    });
    setPageToRender(page);
    setNames(
      surahs.length
        ? { ar: surahs, de: surahs_de }
        : { ar: [ayet[0].surah.name], de: [ayet[0].surah.englishName] }
    );
    // console.log(Ayahs);
    // console.log(Ayahs);
    console.log(names);
    // console.log(page);
  };

  useEffect(() => {
    const quranEdition = lang === "AR" ? "/quran-uthmani" : "/de.khoury";
    const url = "https://api.alquran.cloud/v1/page/" + page + quranEdition;
    setLoading(true);
    axios
      .get<ApiResponse>(url)
      .then((res) => {
        setNumber(res.data.data.number);
        setAyahs(res.data.data.ayahs);
        setJuz(res.data.data.ayahs[0]?.juz);

        getPage(res.data.data.ayahs);
        // console.log(Ayahs[0]?.text);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.warn("Page Number UseQuran: " + page);
      });
  }, [page, lang]);
  return { Loading, Number, pageToRender, names, juz, Ayahs };
}

export default useQuran;
