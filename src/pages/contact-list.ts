import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ContactService } from 'services/contact';
import { IContact } from 'models/contact';

@inject(ContactService, Router)
export class ContactListViewModel {

  contact: IContact = null;

  constructor(
    private contactService: ContactService,
    private router: Router) { }

  async activate({ id }) {
    const [contacts, contact] = await Promise.all([
      this.contactService.getAllContacts(),
      id ? this.contactService.getContact(id) : null
    ]);
    if (contact) {
      const { id, name, phone, email } = contact;
      this.contact = { id, name, phone, email };
    } else {
      this.contact = null;
    }
  }

  save() {
    const { id, name, phone, email } = this.contact;
    this.contactService.saveContact({ id, name, phone, email });
    this.router.navigateToRoute('contact-list');
  }
}
