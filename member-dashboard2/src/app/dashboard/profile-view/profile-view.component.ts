import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {UserProfile} from '@core/models/user-profile.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  @Input()
  userProfile?: UserProfile;

  constructor() {
  }

  ngOnInit(): void {
  }

}
