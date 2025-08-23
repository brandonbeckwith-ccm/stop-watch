import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateTime = (
  date: Date | string | number,
  tz: string = dayjs.tz.guess()
): string => {
  return dayjs(date).tz(tz).format("DD/MM/YYYY HH:mm:ss");
};

export const formatTimeInMs = (milliseconds: number): string => {
  const totalMs = Math.floor(milliseconds);
  const minutes = Math.floor(totalMs / 6000);
  const seconds = Math.floor((totalMs % 6000) / 100);
  const centiseconds = Math.floor(totalMs % 100);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;
};
