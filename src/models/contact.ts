import { ValidationRules } from 'aurelia-validation';
import { ILocation } from 'models/location';

export interface IContact {
  id: number,
  name: string,
  email?: string,
  phone?: string,
  birthday?: Date,
  place?: ILocation;
}

export class Contact implements IContact {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  place?: ILocation;

  constructor({ id, name, email, phone, birthday, place }: IContact) {
    Object.assign(this, { id, name, email, phone, birthday, place });
  }
}

ValidationRules
  .ensure((contact: IContact) => contact.id)
    .satisfies((id) => typeof(id) === 'number')
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
  .on(Contact);
