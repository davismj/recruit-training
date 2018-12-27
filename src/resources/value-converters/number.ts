import { valueConverter } from 'aurelia-framework';

const parse = function parse(str: string): number {
  return str ? Number(str) : NaN
}

@valueConverter('number')
export class NumberValueConverter {
  // toView(number: number): string {
  //   return number.toString();
  // }
  fromView(str: string | any | void): number {
    if (!str) {
      return 0;
    }
    if (typeof(str) !== 'string') {
      str = str.toString();
    }
    return parse(str);
  }
}

@valueConverter('digits')
export class DigitsValueConverter extends NumberValueConverter {
  toView(val: any | void, digits: number = 2, more: any = null): string {
    if (!val) {
      return '';
    }
    let num = val;
    if (typeof(num) !== 'number') {
      num = parse(num.toString());
    }
    return Number.isFinite(num) ? num.toFixed(digits) : val;
  }
}
