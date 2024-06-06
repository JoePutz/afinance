import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorFunctions} from '@core/validators/validator-functions';
import {CardService} from '@core/services/card.service';
import {ActivateCardRequest} from '@core/models/activate-card-request.model';

@Component({
  selector: 'app-activate-card-form',
  templateUrl: './activate-card-form.component.html',
  styleUrls: ['./activate-card-form.component.sass']
})
export class ActivateCardFormComponent implements OnInit {

  activateCardForm!: FormGroup;
  errorMessage?: string;
  loading = false;
  activated = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    const {cardNumberValidator} = ValidatorFunctions;
    this.activateCardForm = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        cardNumberValidator()
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d){2}\/(\d){4}$/g)
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d){2}\/(\d){2}\/(\d){4}$/g)
      ]),
      lastFourOfSSN: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])
    });
  }

  activateCard() {
    this.loading = true;
    const request: ActivateCardRequest = {...this.activateCardForm.value};
    const expDateStr = this.activateCardForm.value.expirationDate;
    const dob = this.activateCardForm.value.dateOfBirth;
    const expDateArr: string[] = expDateStr.split('/');
    const month = parseInt(expDateArr[0]) - 1;
    const year = parseInt(expDateArr[1]);
    const expDate = new Date();
    expDate.setMonth(month);
    expDate.setDate(1);
    expDate.setFullYear(year);
    request.expirationDate = new Date(expDate);
    request.dateOfBirth = new Date(dob);
    this.cardService.activateCard(request)
      .subscribe(
        () => {
          this.activated = true;
          this.loading = false;
        },
        () => {
          this.errorMessage = 'Unable activate card. Make sure the information you entered is correct and try again.';
          this.loading = false;
        });
  }

}
