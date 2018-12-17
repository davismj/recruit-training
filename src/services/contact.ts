import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IContact, Contact } from 'models/contact';

@inject(HttpClient)
export class ContactService {

  contacts: Array<Contact> = [];

  constructor(
    private http: HttpClient) { }

  async getAllContacts(): Promise<Array<Contact>> {
    const response = await this.http.get('api/contacts');
    const contacts = await response.json();
    this.contacts.splice(0, Infinity, ...contacts.map((c) => new Contact(c)));
    return this.contacts;
  }

  async getContact(id: number | string): Promise<Contact> {
    const response = await this.http.get(`api/contacts/${id}`);
    const contact = await response.json();
    return new Contact(contact);
  }

  // should immediately update the single source of truth
  async saveContact(contact: IContact): Promise<Contact> {
    contact = new Contact(contact);
    const response = await this.http.post('api/contacts', contact);
    Object.assign(contact, await response.json());
    return contact as Contact;
  }

  async deleteContact({ id }: IContact) {
    const index = this.contacts.findIndex((contact) => contact.id == id);
    if (index > -1) {
      const [contact] = this.contacts.splice(index, 1);
      contact.dispose();
    }
    await this.http.delete(`api/contacts/${id}`);
  }
}
