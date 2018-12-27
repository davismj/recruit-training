import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IContact, Contact } from 'models/contact';

@inject(HttpClient)
export class ContactService {

  private readonly contacts: Array<Contact> = [];

  constructor(
    private httpClient: HttpClient) { }

  async getAllContacts(): Promise<Array<Contact>> {
    const response: Response = await this.httpClient.get('api/contacts');
    const contacts: Array<Contact> = await response.json();
    this.contacts.splice(0, Infinity, ...contacts.map((c) => new Contact(c)));
    return this.contacts;
  }

  async getContact(id: number | string): Promise<Contact> {
    const response = await this.httpClient.get(`api/contacts/${id}`);
    const contact: IContact = await response.json();
    return new Contact(contact);
  }

  // should immediately update the single contact object
  async saveContact(contact: IContact) {
    contact = new Contact(contact);
    const response = await this.httpClient.post('api/contacts', contact);
    const { id, ...data } = await response.json();
    return Object.assign(contact, data);
  }
}
