import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  index(id: any){
    return this.http.get(environment.APP_URL + `modules/${id}`, {withCredentials: true})
  }

  store(inputData: any){
    return this.http.post(
      environment.APP_URL + 'modules',
      inputData,
      { withCredentials: true }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL +  `module/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL + `modules/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  courseModules(slug: any){
    return this.http.get(
      environment.APP_URL +
        `course-modules/${slug}`,
      { withCredentials: true }
    );
  }

  vleModules(id: any){
    return this.http.get(environment.APP_URL + `vle-modules/${id}`)
  }


}
