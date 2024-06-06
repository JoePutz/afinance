import {Injectable} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {JWT} from '@core/models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  saveJwt(token: string): void {
    localStorage.setItem('jwt', token);
  }

  deleteJwt(): void {
    localStorage.removeItem('jwt');
  }

  getJwt(): string | null {
    return localStorage.getItem('jwt');
  }

  parseJwt(): JWT | null {
    if (this.getJwt()) {
      return jwtDecode(this.getJwt()!);
    }
    return null;
  }

  getUsername(): string {
    return this.parseJwt()?.sub!;
  }

  getRole(): string {
    return this.parseJwt()?.authority!;
  }

  getIssueAtDate(): Date {
    return new Date(this.parseJwt()?.iat! * 1000);
  }

  getExpirationDate(): Date {
    return new Date(this.parseJwt()?.exp! * 1000);
  }

  isValid(): boolean {
    return this.getExpirationDate().getDate() <= Date.now().valueOf();
  }

}


