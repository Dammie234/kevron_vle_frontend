import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  admin(){
    return this.http.get(environment.APP_URL + 'admin-dashboard', {withCredentials: true})
  }

  instructor(){
    return this.http.get(
      environment.APP_URL +
        'instructor-dashboard',
      { withCredentials: true }
    );
  }

  student(){
    return this.http.get(
      environment.APP_URL + 'student-dashboard',
      { withCredentials: true }
    );
  }
}
