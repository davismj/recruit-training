export class Permissions {
  static None = 0;
  static ViewContacts = 2 ** 0; // 1
  static EditContacts = 2 ** 1; // 2
  static checkPermissions(required, available) {
    return (required & available) === required;
  }
}

export interface IClaims {
  sub?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: string;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: string;
  address?: string;
  updated_at?: string;
  permissions: number;
  [key: string]: string | number;
}
