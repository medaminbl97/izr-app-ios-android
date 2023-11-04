import axios from "axios";
import { useState, useEffect } from "react";

export interface EventsFyler {
  flyer: string;
  description: string;
  title: string;
  subtitle: string;
  link: string;
  date: string;
}

interface ApiResponse {
  events: EventsFyler[];
}

function useEvents(refresh: boolean, reload: boolean) {
  const [eventFlyers, setEventFlyer] = useState<EventsFyler[]>([]);
  const [length, setLength] = useState(0);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<ApiResponse>("https://izr-cloud.online/getEvents/all")
      .then((res) => {
        setEventFlyer(res.data.events);
        console.log("refresh event");
        // console.log(res.data.events);
        setLoading(false);
        setLength(eventFlyers.length);
      })

      .catch((error) => {
        setLoading(false);
        console.error("Error loading JSON file:", error);
      });
  }, [refresh, reload]);

  return { Loading, eventFlyers, length };
}

export default useEvents;
