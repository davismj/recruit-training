import { inject } from 'aurelia-framework';
import { Timezone } from 'models/timezone';

const getDayName = (day) => {
  return { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thur', 5: 'Fri', 6: 'Sat' }[day];
}

const getMonthName = month => {
  return { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sept', 9: 'Oct', 10: 'Nov', 11: 'Dec' }[month];
}

const pad = function(num) {
  return num < 10 ? `0${num}` : num;
}

const dateTimeFormat = function(date: Date) {
  const ddd = getDayName(date.getUTCDay());
  const dd = date.getUTCDate();
  const mmm = getMonthName(date.getUTCMonth());
  const yyyy = date.getFullYear();
  const time = timeFormat(date);
  return `${time} on ${ddd}, ${dd} ${mmm} ${yyyy}`;
}

const timeFormat = function(date: Date) {
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${hh}:${mm}:${ss}`;
}

export class LocalTimeValueConverter {

  private date = new Date();

  toView(date: Date | void, timezone?: Timezone) {
    if (date) {
      const offset = timezone ? timezone.offset : -date.getTimezoneOffset();
      this.date.setTime(60000 * offset + date.getTime());
      return timeFormat(this.date);
    }
  }
}

export class LocalDateTimeValueConverter {

  private date = new Date();

  toView(date: Date | void, timezone?: Timezone) {
    if (date) {
      const offset = timezone ? timezone.offset : -date.getTimezoneOffset();
      this.date.setTime(60000 * offset + date.getTime());
      return dateTimeFormat(this.date);
    }
  }
}

export class TimeValueConverter {

  private date = new Date();

  toView(date: Date | void) {
    if (date) {
      this.date.setTime(date.getTime());
      return timeFormat(this.date);
    }
  }
}
export class DateTimeValueConverter {

  private date = new Date();

  toView(date: Date | void) {
    if (date) {
      this.date.setTime(date.getTime());
      return dateTimeFormat(this.date);
    }
  }
}
