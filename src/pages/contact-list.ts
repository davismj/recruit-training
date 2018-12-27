import { RedirectToRoute, Router } from 'aurelia-router';
import { IContact, CONTACT_VALIDATION_RULES } from 'models/contact';
import { ContactService } from 'services/contacts';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { CollapseCustomElement } from 'resources/elements/collapse';
import { ClockService } from 'services/clock';
import { Timezone } from 'models/timezone';

export class ContactListViewModel {

  static inject = [ContactService, Router, ValidationControllerFactory, ClockService]

  contact: IContact = null;
  timezones: Array<Timezone> = Timezone.Timezones;

  private validation: ValidationController;

  // refs
  birthdayCollapse: CollapseCustomElement;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private validationFactory: ValidationControllerFactory,
    private clockService: ClockService) { }

  async canActivate({ id }: { id: string }) {
    if (id) {
      if (id === 'new') {
        this.contact = { id: null, name: '' };
      } else {
        const contact = await this.contactService.getContact(id);
        if (contact) {
          this.contact = { id: contact.id, ...contact };
        } else {
          return new RedirectToRoute('contact-list');
        }
      }
    } else {
      this.contact = null;
    }
    if (this.contact) {
      this.validation = this.validationFactory.createForCurrentScope();
      this.validation.addObject(this.contact, CONTACT_VALIDATION_RULES);
    }
    return true;
  }

  async activate() {
    await this.contactService.getAllContacts();
  }

  setLocation({ lat, lng }) {
    this.contact.place = { lat, lng };
  }

  removeLocation() {
    this.contact.place = null;
  }

  async save() {
    const { valid } = await this.validation.validate();
    if (valid) {
      this.contactService.saveContact(this.contact);
      this.router.navigateToRoute('contact-list');
    }
  }
}
