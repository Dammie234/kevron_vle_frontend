import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  categories(){
    return this.http.get(environment.APP_URL + 'categories', {withCredentials: true})
  }

  store(inputData: any){
    return this.http.post(environment.APP_URL + 'categories', inputData, {
      withCredentials: true,
    });
  }

  show(id: any){
    return this.http.get(environment.APP_URL + `categories/${id}`, {
      withCredentials: true,
    });
  }

  update(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL + `categories/${id}`,
      inputData,
      { withCredentials: true }
    );
  }
}
