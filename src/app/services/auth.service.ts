import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(inputData: any) {
    return this.http.post(environment.APP_URL + 'login', inputData, {
      withCredentials: true,
    });
  }

  user() {
    return this.http.get(
      environment.APP_URL + 'user',
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.post(
      environment.APP_URL + 'logout',
      {},
      { withCredentials: true }
    );
  }

  forgetPassword(inputData: any) {
    return this.http.post(environment.APP_URL + 'forget-password', inputData);
  }

  userByToken(token: any) {
    return this.http.get(environment.APP_URL + `user-by-token/${token}`);
  }
  changePassword(inputData: any) {
    return this.http.post(environment.APP_URL + 'reset-password', inputData);
  }
}
