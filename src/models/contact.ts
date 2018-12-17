import { ValidationRules } from 'aurelia-validation';
import { ILocation } from 'models/location';
import { Timezone } from 'models/timezone';

const INDEX = new Map();
const ID = new WeakMap();

export interface IContact {
  id: number,
  name: string,
  email?: string,
  phone?: string,
  birthday?: Date,
  place?: ILocation;
  timezone?: Timezone;
}

export class Contact implements IContact {

  name: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  place?: ILocation;
  timezone?: Timezone;

  constructor({ id, ...obj }: IContact) {
    let contact = INDEX.get(id);
    if (!contact) {
      ID.set(this, id);
      INDEX.set(id, this);
      contact = this;
    }
    return Object.assign(contact, obj);
  }

  get id(): number {
    return ID.get(this);
  }

  dispose() {
    INDEX.delete(this.id);
  }
}

export const CONTACT_RULES = ValidationRules
  .ensure((contact: IContact) => contact.name)
    .displayName('contact.NAME')
    .required()
  .ensure((contact: IContact) => contact.phone)
    .displayName('contact.PHONE_NUMBER')
    .matches(/^\d{3}[-\s]?\d{4}[-\s]?\d{4}$/i)
    .withMessage('contact.YOUR_PHONE_NUMBER_SHOULD_BE_IN_THE_FORMAT')
    // .when((contact: IContact) => !contact.email)
    //   .required()
  .ensure((contact: IContact) => contact.email)
    .displayName('contact.EMAIL_ADDRESS')
    .email()
    .withMessage('contact.NOT_A_VALID_EMAIL_ADDRESS')
    // .when((contact: IContact) => !contact.phone)
    //   .required()
  .ensure((contact: IContact) => contact.birthday)
    .satisfies((bd) => !bd || bd instanceof Date)
  .ensureObject()
    .satisfies((contact: IContact) => !!contact.phone || !!contact.email)
    .withMessage('contact.MUST_PROVIDE_PHONE_OR_EMAIL')
  .on(Contact)
  .rules;
