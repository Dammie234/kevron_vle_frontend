import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  store(inputData: any){
    return this.http.post(environment.APP_URL + 'sections', inputData, {withCredentials: true})
  }

  index(id: any){
    return this.http.get(
      environment.APP_URL +  `sections/${id}`,
      { withCredentials: true }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL + `section/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL + `sections/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  sections(slug: any){
    return this.http.get(
      environment.APP_URL +
        `sections-by-slug/${slug}`,
      {
        withCredentials: true,
      }
    );
  }
}
