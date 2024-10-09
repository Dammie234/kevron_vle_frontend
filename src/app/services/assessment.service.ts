import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpClient) { }

  index(){
    return this.http.get(environment.APP_URL + 'assessment-questions', {withCredentials: true});
  }


  store(inputData: any){
    return this.http.post(
      environment.APP_URL +
        'assessment-questions',
      inputData,
      { withCredentials: true }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL +
        `assessment-questions/${id}`,
      { withCredentials: true }
    );
  }

  update(id: any, inputData: any){
    return this.http.patch(
      environment.APP_URL +
        `assessment-questions/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  assessment(id: any) {
    return this.http.get(
      environment.APP_URL + `assessment/${id}`,
      { withCredentials: true }
    );
  }

  assessmentAnswers(id: any){
    return this.http.get(
      environment.APP_URL +
        `assessment-answers/${id}`,
      { withCredentials: true }
    );
  }

  studentAssessmentAnswers(){
    return this.http.get(
      environment.APP_URL +
        'student-assessments',
      { withCredentials: true }
    );
  }
}
