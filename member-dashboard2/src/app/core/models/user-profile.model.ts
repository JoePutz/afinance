import {ContactInfo} from '@core/models/contact-info.model';
import {Address} from '@core/models/address.model';

export interface UserProfile {
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  membershipId: string;
  income: number;
  contactInfo: ContactInfo;
  billingAddress: Address;
  mailingAddress: Address;
}
