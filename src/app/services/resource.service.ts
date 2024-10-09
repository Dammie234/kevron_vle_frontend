import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  resources(id: any) {
    return this.http.get(environment.APP_URL + `resources/${id}`, {
      withCredentials: true,
    });
  }

  updateResource(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL +
        `resources/${id}/update`,
      inputData,
      { withCredentials: true }
    );
  }

  lockResource(id: any){
    return this.http.get(
      environment.APP_URL +
        `resources/${id}/lock`,
      { withCredentials: true }
    );
  }

  unlockResource(id: any){
    return this.http.get(
      environment.APP_URL +
        `resources/${id}/unlock`,
      {
        withCredentials: true,
      }
    );
  }

  store(inputData: any){
    return this.http.post(
      environment.APP_URL + 'resources',
      inputData,
      { withCredentials: true }
    );
  }

  delete(id: any){
    return this.http.delete(
      environment.APP_URL + `resources/${id}`,
      { withCredentials: true }
    );
  }
}
