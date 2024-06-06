import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {environment} from '@environments/environment';
import {RegistrationService} from '@core/services/registration.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorFunctions} from '@core/validators/validator-functions';
import {UserRegistration} from '@core/models/user-registration.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass']
})
export class RegistrationFormComponent implements OnInit, AfterViewInit {

  @ViewChild('templateWelcome')
  welcomePage?: TemplateRef<any>;

  @ViewChild('templateBeforeWeStart')
  beforeWeStart?: TemplateRef<any>;

  @ViewChild('templateRegistrationForm')
  regFormTemplate?: TemplateRef<any>;

  @ViewChild('templateRegistrationSuccess')
  regSuccessTemplate?: TemplateRef<any>;

  templates?: TemplateRef<any>[];

  @ViewChild('formContainer', {read: ViewContainerRef})
  formContainer?: ViewContainerRef;

  currentTemplate = 0;

  landingPortalSignup: string;

  registrationForm!: FormGroup;
  registrationLoading = false;

  errorMessage?: string;

  email?: string;

  constructor(private service: RegistrationService) {
    this.landingPortalSignup = `${environment.application.landingPortal}/signup`;
  }

  ngOnInit(): void {
    const {
      usernameValidator,
      passwordValidator,
      membershipIdValidator,
      confirmValues
    } = ValidatorFunctions;
    this.registrationForm = new FormGroup({
      membershipId: new FormControl('', [
        Validators.required,
        membershipIdValidator()
      ]),
      lastFourOfSSN: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]),
      username: new FormControl('', [
        Validators.required,
        usernameValidator()
      ]),
      password: new FormControl('', [
        Validators.required,
        passwordValidator()
      ]),
    });

    this.registrationForm.addControl('confirmPassword', new FormControl('', [
      Validators.required,
      confirmValues(this.registrationForm.get('password')!)
    ]));
  }

  ngAfterViewInit(): void {
    this.templates = [this.welcomePage!, this.beforeWeStart!, this.regFormTemplate!, this.regSuccessTemplate!];
    this.setCurrentTemplate();
    console.log(this.templates?.length);
  }

  setCurrentTemplate() {
    if (this.templates && this.formContainer) {
      const temp = this.templates[this.currentTemplate];
      this.formContainer.clear();
      const embeddedView = this.formContainer.createEmbeddedView(temp!);
      embeddedView.detectChanges();
    }
  }

  nextTemplate(): void {
    if (this.currentTemplate < this.templates!.length - 1) {
      this.currentTemplate++;
      this.setCurrentTemplate();
    }
  }

  prevTemplate(): void {
    if (this.currentTemplate > 0) {
      this.currentTemplate--;
      this.setCurrentTemplate();
    }
  }

  registerUser(): void {
    this.registrationLoading = true;
    const {username, password, membershipId, lastFourOfSSN} = this.registrationForm.value;
    const registration: UserRegistration = new UserRegistration(
      username,
      password,
      membershipId,
      lastFourOfSSN
    );
    this.disableForm();
    this.service.registerUser(registration)
      .subscribe(
        response => {
          this.email = response.body?.email;
          this.registrationLoading = false;
          this.enableForm();
          this.nextTemplate();
        },
        error => {
          if (!(error instanceof ProgressEvent)) {
            this.registrationLoading = false;
            this.enableForm();
            this.errorMessage = error;
            console.error(error);
          }
        }
      );
  }

  disableForm(): void {
    this.registrationForm.disable();
  }

  enableForm(): void {
    this.registrationForm.enable();
  }

}
