const formatDate = function formatDate(date: Date, format?: string): string {
  if (format) {
    const MM = date.getMonth() + 1;
    const DD = date.getDate();
    const YYYY = date.getFullYear();
    const pad = function pad(num: number): string {
      return num < 10 ? `0${num}` : num.toString();
    }
    return format
      .replace(/MM/g, pad(MM))
      .replace(/DD/g, pad(DD))
      .replace(/YYYY/g, YYYY.toString());
  } else {
    return date.toUTCString();
  }
}

const parseDate = function parseDate(str: string, format?: string): Date {
  let date;
  if (format) {
    date = new Date();
    const monthToken = '\\d{2}';
    const dateToken = '\\d{2}';
    const yearToken = '\\d{4}';
    const yearRe = new RegExp(format
      .replace('MM', monthToken)
      .replace('DD', dateToken)
      .replace('YYYY', `(${yearToken})`)
    );
    const monthRe = new RegExp(format
      .replace('MM', `(${monthToken})`)
      .replace('DD', dateToken)
      .replace('YYYY', yearToken)
    );
    const dateRe = new RegExp(format
      .replace('MM', monthToken)
      .replace('DD', `(${dateToken})`)
      .replace('YYYY', yearToken)
    );

    // parse month date and year
    const monthMatch = monthRe.exec(str);
    const dateMatch = dateRe.exec(str);
    const yearMatch = yearRe.exec(str);

    // set parsed values
    if (monthMatch) {
      date.setMonth(parseInt(monthMatch[1]) - 1);
    }
    if (dateMatch) {
      date.setDate(parseInt(dateMatch[1]));
    }
    if (yearMatch) {
      date.setFullYear(parseInt(yearMatch[1]));
    }
  } else {
    date = new Date(str);
  }
  return date;
}

export class DateValueConverter {

  value: Date = new Date();

  fromView(str: string | any | void, format = 'YYYY-MM-DD'): Date {
    if (!str) {
      return;
    }
    if (typeof(str) !== 'string') {
      str = str.toString();
    }
    const date = parseDate(str, format);
    this.updateValue(date);
    return this.value;
  }

  toView(val: Date | number | string | void, format = 'YYYY-MM-DD'): string {
    if (!val) {
      return '';
    }
    let date = val;
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    if (isNaN(date.getTime())) {
      return val.toString();
    }
    this.updateValue(date);
    return formatDate(this.value, format);
  }

  private updateValue(date: Date) {
    this.value.setTime(date.getTime());
  }
}
