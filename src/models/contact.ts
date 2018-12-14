import { ValidationRules } from 'aurelia-validation';

export interface IContact {
  id: number,
  name: string,
  email?: string,
  phone?: string
}

export class Contact implements IContact {
  id: number;
  name: string;
  email?: string;
  phone?: string;

  constructor({ id, name, email, phone }: IContact) {
    Object.assign(this, { id, name, email, phone });
  }
}

ValidationRules
  .ensure((contact: IContact) => contact.id)
    .satisfies((id) => typeof(id) === 'number')
  .ensure((contact: IContact) => contact.name)
    .required()
  .ensure((contact: IContact) => contact.phone)
    .displayName('phone number')
    .matches(/^\d{3}[-\s]?\d{4}[-\s]?\d{4}$/i)
    .withMessage('Your phone number should be in the format 000-0000-0000.')
    // .when((contact: IContact) => !contact.email)
    //   .required()
  .ensure((contact: IContact) => contact.email)
    .displayName('email address')
    .email()
    .withMessage('"${$value}" is not a valid email address')
    // .when((contact: IContact) => !contact.phone)
    //   .required()
  .ensureObject()
    .satisfies((contact: IContact) => {
      console.log('checked!')
      return !!contact.phone || !!contact.email
    })
    .withMessage('You must provide either a phone number or an email address.')
  .on(Contact);
