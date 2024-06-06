import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from '@core/models/user-profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormProps} from '@dashboard/form-props.interface';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnInit {

  @Input()
  userProfile!: UserProfile;

  contactInfoForm?: FormGroup;
  billingAddressForm?: FormGroup;
  mailingAddressForm?: FormGroup;

  contactInfoFormProps: FormProps;
  billingAddressFormProps: FormProps;
  mailingAddressFormProps: FormProps;

  constructor(private fb: FormBuilder) {

    this.contactInfoFormProps = {
      phone: {
        mask: '(000) 000-0000',
        dropSpecialCharacters: false,
        errorMessages: {
          required: 'Phone number is required.',
          pattern: 'Phone number is invalid'
        }
      },
      email: {
        errorMessages: {
          required: 'Email is required.',
          email: 'Email is not valid.'
        }
      }
    };
    this.billingAddressFormProps = {
      address: {
        errorMessages: {
          required: 'Address is required.',
          pattern: 'Address is invalid.',
        }
      },
      city: {
        errorMessages: {
          required: 'City is required.'
        }
      },
      state: {
        errorMessages: {
          required: 'State is required.'
        }
      },
      zipcode: {
        mask: '00000',
        errorMessages: {
          required: 'Zipcode is required.',
          pattern: 'Zipcode is not valid.'
        }
      }
    };

    this.mailingAddressFormProps = {
      mailingAddress: {
        errorMessages: {
          required: 'Address is required.',
          pattern: 'Address is invalid.',
        }
      },
      mailingCity: {
        errorMessages: {
          required: 'City is required.'
        }
      },
      mailingState: {
        errorMessages: {
          required: 'State is required.'
        }
      },
      mailingZipcode: {
        mask: '00000',
        errorMessages: {
          required: 'Zipcode is required.',
          pattern: 'Zipcode is not valid.'
        }
      }
    };

  }

  ngOnInit(): void {
    const fb = this.fb;
    const { contactInfo, mailingAddress, billingAddress} = this.userProfile;

    this.contactInfoForm = fb.group({
      phone: fb.control(contactInfo.phone, [
        Validators.required,
        Validators.pattern(/\(\d{3}\)\s\d{3}-\d{4}/g)
      ]),
      email: fb.control(contactInfo.email, [
        Validators.required,
        Validators.email
      ])
    });

    this.billingAddressForm = fb.group({
      address: fb.control(billingAddress.address, [
        Validators.required,
        Validators.pattern(/^(\d+([a-zA-Z]+)?)\s(.*)(\s)([a-zA-Z]+)(\.)?(\s(#?(\w+))|([A-Za-z]+\.?(\w+)))?$/g)
      ]),
      city: fb.control(billingAddress.city, [
        Validators.required,
      ]),
      state: fb.control(billingAddress.state, [
        Validators.required,
      ]),
      zipcode: fb.control(billingAddress.zipcode, [
        Validators.required,
        Validators.pattern(/^\d{5}(-\d{4})?$/g)
      ])
    });

    this.mailingAddressForm = fb.group({
      mailingAddress: fb.control(mailingAddress.address, [
        Validators.required,
        Validators.pattern(/^(((PO|P O|P.O)\.?\s(Box)\s(\d+))|((\d+([a-zA-Z]+)?)\s(.*)(\s)([a-zA-Z]+)(\.)?(\s(#?(\w+))|([A-Za-z]+\.?(\w+)))?))$/g)
      ]),
      mailingCity: fb.control(mailingAddress.city, [
        Validators.required,
      ]),
      mailingState: fb.control(mailingAddress.state, [
        Validators.required,
      ]),
      mailingZipcode: fb.control(mailingAddress.zipcode, [
        Validators.required,
        Validators.pattern(/^\d{5}(-\d{4})?$/g)
      ])
    });
  }

}
