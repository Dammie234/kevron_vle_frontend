import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  constructor(private http: HttpClient) { }

  store(inputData: any){
    return this.http.post(
      environment.APP_URL + 'student-courses',
      inputData,
      { withCredentials: true }
    );
  }

  index(){
    return this.http.get(
      environment.APP_URL + 'student-courses',
      { withCredentials: true }
    );
  }

  courses(){
    return this.http.get(
      environment.APP_URL + 'my-courses',
      { withCredentials: true }
    );
  }

  classroom(key: any){
    return this.http.get(
      environment.APP_URL + `classroom/${key}`,
      { withCredentials: true }
    );
  }
}
