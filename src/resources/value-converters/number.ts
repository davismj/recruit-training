// import { valueConverter } from 'aurelia-framework';

const parse = function parse(str: string): number {
  return str ? Number(str) : NaN
}

// @valueConverter('number')
export class NumberValueConverter {
  fromView(str: string | any): number | string {
    if (typeof(str) !== 'string') {
      str = str.toString();
    }
    const num = parse(str);
    return Number.isFinite(num) ? num : str;
  }
}

// @valueConverter('digits')
export class DigitsValueConverter extends NumberValueConverter {
  toView(val: any, digits: number = 0): string {
    let num = val;
    if (typeof(num) !== 'number') {
      num = parse(num.toString());
    }
    return Number.isFinite(num) ? num.toFixed(digits) : val;
  }
}
