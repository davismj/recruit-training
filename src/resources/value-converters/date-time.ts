import { Timezone } from 'models/timezone';

const getDayName = (day: number): string => {
  return { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thur', 5: 'Fri', 6: 'Sat' }[day];
}

const getMonthName = (month: number): string => {
  return { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sept', 9: 'Oct', 10: 'Nov', 11: 'Dec' }[month];
}

const pad = function(num: number) {
  return num < 10 ? `0${num}` : num;
}

const dateTimeFormat = function(date: Date): string {
  const ddd = getDayName(date.getUTCDay());
  const dd = date.getUTCDate();
  const mmm = getMonthName(date.getUTCMonth());
  const yyyy = date.getFullYear();
  const time = timeFormat(date);
  return `${time} on ${ddd}, ${dd} ${mmm} ${yyyy}`;
}

const timeFormat = function(date: Date): string {
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${hh}:${mm}:${ss}`;
}

export class LocalDateTimeValueConverter {

  private date = new Date();

  toView(date: Date | void, timezone?: Timezone): string | void {
    if (date) {
      const offset = timezone ? timezone.offset : -date.getTimezoneOffset();
      this.date.setTime(60000 * offset + date.getTime());
      return dateTimeFormat(this.date);
    }
  }
}

export class DateTimeValueConverter {

  private date = new Date();

  toView(date: Date | void, timezone?: Timezone): string | void {
    if (date) {
      const offset = -date.getTimezoneOffset();
      this.date.setTime(60000 * offset + date.getTime());
      return dateTimeFormat(this.date);
    }
  }
}
