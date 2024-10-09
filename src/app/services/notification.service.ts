import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  notifications(){
    return this.http.get(environment.APP_URL + 'notifications', {withCredentials: true})
  }

  destroy(id: any){
    return this.http.delete(
      environment.APP_URL +
         `notifications/${id}`,
      { withCredentials: true }
    );
  }



}
