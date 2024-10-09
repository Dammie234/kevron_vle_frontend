import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  courses(){
    return this.http.get(environment.APP_URL + 'courses', {withCredentials: true})
  }

  store(inputData: any){
    return this.http.post(
      environment.APP_URL + 'courses',
      inputData,
      { withCredentials: true }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL + `courses/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id:  any){
    return this.http.patch(
      environment.APP_URL + `courses/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  instructorCourses(){
    return this.http.get(
      environment.APP_URL +
        'instructor-courses',
      { withCredentials: true }
    );
  }

  courseDetails(slug: any){
    return this.http.get(
      environment.APP_URL +
        `course-details/${slug}`,
      { withCredentials: true }
    );
  }

  vleCourses(){
    return this.http.get(environment.APP_URL + 'vle-courses')
  }
  vleCourseDetails(slug: any){
    return this.http.get(environment.APP_URL + `vle-course-details/${slug}`);
  }
}
