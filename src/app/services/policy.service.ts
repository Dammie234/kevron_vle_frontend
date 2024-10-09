import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }


  index(){
    return this.http.get(environment.APP_URL + 'policies', {withCredentials: true})
  }


  store(inputData: any){
    return this.http.post(
      environment.APP_URL + 'policies',
      inputData,
      { withCredentials: true }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL + `policies/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL + `policies/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  policies(){
    return this.http.get(environment.APP_URL + 'user-policies', {
      withCredentials: true,
    });
  }

  unreadPolicies(){
    return this.http.get(
      environment.APP_URL + 'unread-policies',
      { withCredentials: true }
    );
  }

  readPolicy(id: any){
    return this.http.get(
      environment.APP_URL + `read-policy/${id}`,
      { withCredentials: true }
    );
  }

  allPolicies(){
    return this.http.get(
      environment.APP_URL + 'all-policies',
      { withCredentials: true }
    );
  }

  userPolicies(){
    return this.http.get(
      environment.APP_URL + 'user-policies',
      { withCredentials: true }
    );
  }

}
