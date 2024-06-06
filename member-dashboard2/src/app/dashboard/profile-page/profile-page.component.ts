import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '@core/services/user-profile.service';
import {UserProfile} from '@core/models/user-profile.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {

  userProfile?: UserProfile;

  constructor(private profileService: UserProfileService) { }

  ngOnInit(): void {
    this.retrieveProfile();
  }

  retrieveProfile() {
    this.profileService.getUserProfile().subscribe(
      userProfile => {
        this.userProfile = userProfile;
      }
    );
  }

}
