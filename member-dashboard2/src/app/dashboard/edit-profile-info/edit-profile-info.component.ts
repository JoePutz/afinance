import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from '@core/models/user-profile.model';
import {FormGroup} from '@angular/forms';
import {UserProfileService} from '@core/services/user-profile.service';
import {UserProfileUpdate} from '@core/models/user-profile-update.model';
import {FormProps} from '@dashboard/form-props.interface';

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.sass']
})
export class EditProfileInfoComponent implements OnInit {

  @Input()
  formTitle!: string;

  @Input()
  userProfile!: UserProfile;

  @Input()
  formGroup!: FormGroup;

  @Input()
  formProps!: FormProps;

  initialFormValues = {};

  editMode = false;
  saving = false;

  originalOrder = (): number => {
    return 0;
  }

  constructor(private profileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.initialFormValues = {...this.formGroup.value};
  }

  saveProfile() {
    this.editMode = false;
    this.saving = true;

    const update: UserProfileUpdate = {...this.formGroup.value};

    this.profileService.updateUserProfile(update)
      .subscribe(
        () => {},
        () => {
          this.editMode = true;
        },
        () => {
          this.saving = false;
        }
      )
  }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
    this.formGroup.setValue(this.initialFormValues);
  }

}
