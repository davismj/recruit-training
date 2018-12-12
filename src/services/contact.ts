import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IContact } from 'models/contact';

@inject(HttpClient)
export class ContactService {

  private contacts: Array<IContact> = [];

  constructor(
    private http: HttpClient) { }

  async getAllContacts(): Promise<Array<IContact>> {
    const response = await this.http.get('api/contacts');
    const contacts = await response.json();
    this.contacts.splice(0, Infinity, ...contacts);
    return this.contacts;
  }
}
