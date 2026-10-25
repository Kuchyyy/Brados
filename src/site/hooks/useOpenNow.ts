import { useEffect, useState } from "react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function isOpenNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = WEEKDAYS.indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return day < 5 && minutes >= 450 && minutes < 960;
}

export function useOpenNow() {
  const [open, setOpen] = useState(isOpenNow);
  useEffect(() => {
    const id = window.setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return open;
}
