import { inject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { ContactService } from 'services/contact';
import { IContact, Contact } from 'models/contact';

@inject(ContactService, Router, ValidationControllerFactory)
export class ContactListViewModel {

  contact: IContact = null;
  validation: ValidationController;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private validationFactory: ValidationControllerFactory) { }

  async canActivate({ id }) {
    if (id === 'new') {
      this.contact = new Contact({ id: null, name: '', phone: '', email: '' });
    } else if (id) {
      const contact = await this.contactService.getContact(id);
      if (contact) {
        const { id, name, phone, email } = contact;
        this.contact = new Contact({ id, name, phone, email });
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
    if (this.contact) {
      this.validation = this.validationFactory.createForCurrentScope();
      this.validation.addObject(this.contact);
    }
  }

  deactivate() {
    this.validation = null;
  }

  async save() {
    const { valid } = await this.validation.validate();
    if (valid) {
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
}
