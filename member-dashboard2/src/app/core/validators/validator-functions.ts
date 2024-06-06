import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ValidationExpressions} from '@core/validators/validation-expressions';

export const ValidatorFunctions = {
  usernameValidator: (): ValidatorFn => {
    const {username} = ValidationExpressions;
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidUsername = !username.test(control.value);
      return invalidUsername ? {username: {value: control.value}} : null;
    };
  },
  passwordValidator: (): ValidatorFn =>  {
    const {password} = ValidationExpressions;
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidPassword = !password.test(control.value);
      return invalidPassword ? {password: {value: control.value}} : null;
    };
  },
  membershipIdValidator: (): ValidatorFn =>  {
    const {membershipId} = ValidationExpressions;
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidMembershipId = !membershipId.test(control.value);
      return invalidMembershipId ? {membershipId: {value: control.value}} : null;
    };
  },
  confirmValues: (controlToCompare: AbstractControl): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const toCompare = controlToCompare.value;
      const notTheSame = control.value !== toCompare;
      return notTheSame ? {confirmPassword: {value: control.value, comparingTo: toCompare}} : null;
    };
  },
  cardNumberValidator: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      return !cardNumberIsValid(control.value) ? {cardNumber: {value: control.value}} : null;
    };
  }
};

function cardNumberIsValid(cardNumber: string): boolean {
  const len = cardNumber.length;
  const checkDigit = parseInt(cardNumber.charAt(len - 1));
  const sum = cardNumber.substring(0, len - 1).split('')
    .reverse()
    .map(digit => parseInt(digit))
    .map((digit, index) => index % 2 === 0 ? digit * 2 : digit)
    .map(digit => digit > 9 ? digit - 9 : digit)
    .reduce((a, b) => a + b, 0);
  return (sum + checkDigit) % 10 === 0;
}
