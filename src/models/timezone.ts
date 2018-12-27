export class Timezone {

  code: string;
  offset: number;
  region: string;

  constructor({ code, offset, region }) {
    this.code = code;
    this.offset = offset;
    this.region = region;
    Object.freeze(this);
    Timezone.Timezones.push(this);
  }

  static Timezones: Timezone[] = [];
  static JST = new Timezone({ code: 'JST', offset: 540, region: 'Tokyo, Osaka, Sapporo' });
  static EST = new Timezone({ code: 'EST', offset: -300, region: 'New York, Miami' });
}
