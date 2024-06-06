import { Injectable } from '@angular/core';
import {BaseHttpService} from '@core/services/base-http.service';
import {HttpClient} from '@angular/common/http';
import {UserProfile} from '@core/models/user-profile.model';
import {Observable} from 'rxjs';
import {UserProfileUpdate} from '@core/models/user-profile-update.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.getApi('/users/current/profile'));
  }

  updateUserProfile(updateRequest: UserProfileUpdate): Observable<any> {
    return this.http.put(this.getApi('/users/current/profile'), updateRequest, {
      observe: 'response'
    });
  }
}
