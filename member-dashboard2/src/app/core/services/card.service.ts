import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ActivateCardRequest} from '@core/models/activate-card-request.model';
import {BaseHttpService} from '@core/services/base-http.service';
import {Observable} from 'rxjs';
import {CardResponse} from '@core/models/card-response.model';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  activateCard(request: ActivateCardRequest): Observable<CardResponse> {
    return this.http.post<CardResponse>(this.getApi('/cards/activation'), request);
  }

}
