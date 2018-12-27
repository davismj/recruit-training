import { ValidationRules } from 'aurelia-validation';
import L from 'leaflet';
import { Timezone } from 'models/timezone';

export interface IContact {
  id: number,
  name: string,
  email?: string,
  phone?: string,
  birthday?: Date,
  place?: L.Latlng,
  timezone?: Timezone
}

const INDEX = new Map();
const ID = new WeakMap();

export class Contact implements IContact {

  name: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  place?: L.Latlng;
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
}

export const CONTACT_VALIDATION_RULES = ValidationRules
  .ensure((c: IContact) => c.id)
    .satisfies((id) => typeof(id) === 'number')
  .ensure((c: IContact) => c.name)
    .required()
    .withMessage('contact.NAME_IS_REQUIRED')
  .ensure((c: IContact) => c.email)
    .email()
    .withMessage('contact.EMAIL_IS_INVALID')
  .ensure((c: IContact) => c.phone)
    .matches(/^\d{3}[-\s]?\d{4}[-\s]?\d{4}$/i)
    .withMessage('Your phone number should be in the format 000-0000-0000.')
  .ensure((c: IContact) => c.birthday)
    .satisfies((bd) => !bd || bd instanceof Date)
  .ensureObject()
    .satisfies((c: IContact) => !!c.phone || !!c.email)
    .withMessage('You must provide either a phone number or an email address.')
  .rules;

