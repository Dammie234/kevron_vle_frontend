import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  profile(){
    return this.http.get(
      environment.APP_URL + 'profile',
      { withCredentials: true }
    );
  }

  profilePicture(inputData: any){
    return this.http.post(
      environment.APP_URL + 'profile-picture',
      inputData,
      { withCredentials: true }
    );
  }

  changePassword(inputData: any){
    return this.http.post(
      environment.APP_URL +  'change-password',
      inputData,
      { withCredentials: true }
    );
  }


  instructors(){
    return this.http.get(
      environment.APP_URL + 'instructors',
      { withCredentials: true }
    );
  }
}
