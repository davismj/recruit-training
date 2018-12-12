import { inject } from 'aurelia-framework';
import { ContactService } from 'services/contact';
import { IContact } from 'models/contact';

@inject(ContactService)
export class ContactListViewModel {

  constructor(
    private contactService: ContactService) { }

  async activate() {
    await this.contactService.getAllContacts();
  }
}
