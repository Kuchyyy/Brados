import { useEffect, useState } from "react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const OPEN_FROM = 7 * 60 + 30;
const OPEN_TO = 16 * 60;

const FIXED_HOLIDAYS = ["1-1", "1-6", "5-1", "5-3", "8-15", "11-1", "11-11", "12-24", "12-25", "12-26"];

function easter(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(year, month - 1, day);
}

function isHoliday(year: number, month: number, day: number) {
  if (FIXED_HOLIDAYS.includes(`${month}-${day}`)) return true;
  const offset = (Date.UTC(year, month - 1, day) - easter(year)) / 86_400_000;
  return offset === 1 || offset === 60;
}

function isOpenNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = WEEKDAYS.indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  if (weekday > 4 || isHoliday(Number(get("year")), Number(get("month")), Number(get("day")))) {
    return false;
  }
  return minutes >= OPEN_FROM && minutes < OPEN_TO;
}

export function useOpenNow() {
  const [open, setOpen] = useState(isOpenNow);
  useEffect(() => {
    const id = window.setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return open;
}
