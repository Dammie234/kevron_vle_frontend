import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  register(inputData: any){
    return this.http.post(
      environment.APP_URL +  'students',
      inputData,
      { withCredentials: true }
    );
  }

  students(){
    return this.http.get(
      environment.APP_URL + 'students',
      { withCredentials: true }
    );
  }

  student(id: any){
    return this.http.get(
      environment.APP_URL + `students/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL + `students/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  instructorStudents(slug: any){
    return this.http.get(
      environment.APP_URL +
        `instructor-students/${slug}`,
      { withCredentials: true }
    );
  }
}
