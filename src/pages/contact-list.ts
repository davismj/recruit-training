import { inject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { ClockService } from 'services/clock';
import { ContactService } from 'services/contact';
import { IContact, Contact } from 'models/contact';
import { Timezone } from 'models/timezone';

@inject(ContactService, Router, ValidationControllerFactory, ClockService)
export class ContactListViewModel {

  contact: IContact = null;
  validation: ValidationController;
  timezones = Timezone.Timezones;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private validationFactory: ValidationControllerFactory,
    private clockService: ClockService) { }

  async canActivate({ id }) {
    if (id === 'new') {
      this.contact = new Contact({ id: null, name: '' });
    } else if (id) {
      const contact = await this.contactService.getContact(id);
      if (contact) {
        this.contact = new Contact(contact);
      } else {
        return new Redirect('contact');
      }
    } else {
      this.contact = null;
    }
    if (this.contact) {
      this.validation = this.validationFactory.createForCurrentScope();
      this.validation.addObject(this.contact);
    }
    return true;
  }

  async activate() {
    await this.contactService.getAllContacts();
  }

  async save() {
    const { valid } = await this.validation.validate();
    if (valid) {
      const { id, name, phone, email, birthday, place, timezone } = this.contact;
      this.contactService.saveContact({ id, name, phone, email, birthday, place, timezone });
      this.router.navigateToRoute('contact-list');
    }
  }

  updateLocation({ lat, lng }) {
    this.contact.place = { lat, lng };
  }

  removeLocation() {
    this.contact.place = null;
  }

  remove(contact: IContact) {
    this.contactService.deleteContact(contact);
    if (this.contact.id == contact.id) {
      this.router.navigateToRoute('contact-list');
    }
  }
}
