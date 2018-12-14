import { inject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { ContactService } from 'services/contact';
import { IContact } from 'models/contact';

@inject(ContactService, Router)
export class ContactListViewModel {

  contact: IContact = null;

  constructor(
    private contactService: ContactService,
    private router: Router) { }

  async canActivate({ id }) {
    if (id === 'new') {
      this.contact = { id: null, name: '', phone: '', email: '' };
    } else if (id) {
      const contact = await this.contactService.getContact(id);
      if (contact) {
        const { id, name, phone, email } = contact;
        this.contact = { id, name, phone, email };
      } else {
        return new Redirect('contact')
      }
    } else {
      this.contact = null;
    }
    return true;
  }

  async activate() {
    await this.contactService.getAllContacts();
  }

  save() {
    if (this.isValid) {
      const { id, name, phone, email } = this.contact;
      this.contactService.saveContact({ id, name, phone, email });
      this.router.navigateToRoute('contact-list');
    }
  }

  remove(contact: IContact) {
    this.contactService.deleteContact(contact);
    if (this.contact.id == contact.id) {
      this.router.navigateToRoute('contact-list');
    }
  }

  isPhoneNumber(str) {
    const phoneRe = /^\d{3}[-\s]?\d{4}[-\s]?\d{4}$/i;
    return !str || phoneRe.test(str);
  }

  isEmail(str) {
    const emailRe = /^.+@.+\.\w{2,3}(?:\.{\w2,3})?/i
    return !str || emailRe.test(str);
  }

  get isValid() {
    if (this.contact) {
      const { name, phone, email } = this.contact;
      const { isPhoneNumber, isEmail } = this;
      return name && isPhoneNumber(phone) && isEmail(email);
    }
  }
}
