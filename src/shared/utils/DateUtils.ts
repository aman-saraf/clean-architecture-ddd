import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import { Hour, Minute, Time } from '@common/domain/Time';

dayjs.extend(dayOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

enum TIMEZONES {
  INDIA = 'Asia/Kolkata'
}

export class DateUtils {
  public static getCurrentTime() {
    const today = DateUtils.getIndianDate();
    const now = Time.create({
      hour: Hour.create({
        value: today.hour()
      }).getValue(),
      minute: Minute.create({
        value: today.minute()
      }).getValue()
    });
    return now.getValue();
  }

  public static getIndianDate(date: Date | number | string = new Date()) {
    return dayjs(dayjs.tz(date, TIMEZONES.INDIA).format('YYYY-MM-DD H:m'));
  }

  public static getIndianDay(date: Date | number | string = new Date()) {
    return dayjs(dayjs.tz(date, TIMEZONES.INDIA).format('YYYY-MM-DD'));
  }

  public static getIndianDayAsString(date: Date | number | string = new Date()) {
    return dayjs.tz(date, TIMEZONES.INDIA).format('YYYY-MM-DD');
  }

  public static getIndianDayAfter(daysToAdd: number) {
    return this.getIndianDay().add(daysToAdd, 'day');
  }

  public static getIndianDateFromString(date: string) {
    return dayjs(date, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'YYYY-MM-DD'], TIMEZONES.INDIA, true);
  }

  public static toWeekDay(dayInWeek: number): string {
    switch (dayInWeek) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return 'Sunday';
    }
  }

  public static getDifferenceFromTodayInMonths(date: Date): number {
    const today = DateUtils.getIndianDay();
    var duration = dayjs.duration(today.diff(date)).asMonths();
    return duration;
  }

  public static getTimeDifference(startTime: Time, endTime: Time) {
    const startTimeMinutes = startTime.hour.value * 60 + startTime.minute.value;
    const endTimeMinutes = endTime.hour.value * 60 + endTime.minute.value;
    return startTimeMinutes - endTimeMinutes;
  }

  public static isTimeAfter(startTime: Time, endTime: Time) {
    return DateUtils.getTimeDifference(startTime, endTime) >= 0;
  }

  public static getMonthsInHumanReadableFormat(months: number): string {
    const yearOnly = Math.trunc(months / 12);
    const remainingMonthsOrZero = Math.round(months - yearOnly * 12);
    const remainingMonths = remainingMonthsOrZero > 0 ? remainingMonthsOrZero : 1;
    var result = '';
    if (yearOnly > 1) {
      result += yearOnly + ' years and ';
    } else if (yearOnly == 1) {
      result += yearOnly + ' year and ';
    }
    if (remainingMonths > 1) {
      result += remainingMonths + ' months';
    } else if (remainingMonths == 1) {
      result += remainingMonths + ' month';
    }
    return result;
  }

  public static getFormatedTime(hour: number, minute: number) {
    return dayjs(`${hour}:${minute}`, 'H:m').format('h:mm A');
  }

  public static isBetween(time: Time, start: Time, end: Time) {
    return (
      (time.hour.value > start.hour.value && time.hour.value < end.hour.value) ||
      (time.hour.value === start.hour.value && time.minute.value > start.minute.value) ||
      (time.hour.value === end.hour.value && time.minute.value < end.minute.value)
    );
  }

  public static timeSlotOverlaps(start1: Time, end1: Time, start2: Time, end2: Time) {
    return (
      DateUtils.isBetween(start1, start2, end2) ||
      DateUtils.isBetween(end1, start2, end2) ||
      DateUtils.isBetween(start2, start1, end1) ||
      DateUtils.isBetween(end2, start1, end1) ||
      (DateUtils.isSameTime(start1, start2) && DateUtils.isSameTime(end1, end2))
    );
  }

  public static isSameTime(time1: Time, time2: Time) {
    return time1.hour.value === time2.hour.value && time1.minute.value === time2.minute.value;
  }

  public static isPastDate(date: Date) {
    const today = DateUtils.getIndianDay();
    return today.isAfter(date);
  }
}
