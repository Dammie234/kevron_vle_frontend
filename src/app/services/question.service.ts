import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }


  store(inputData: any){
    return this.http.post(environment.APP_URL + 'questions', inputData, {withCredentials: true})
  }

  instructorQuestions(){
    return this.http.get(
      environment.APP_URL +
        'instructor-questions',
      {
        withCredentials: true,
      }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL + `questions/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id: any){
    return this.http.patch(
      environment.APP_URL + `questions/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

  allQuestions(key: any){
    return this.http.get(
      environment.APP_URL +
        `all-questions/${key}`,
      { withCredentials: true }
    );
  }

  myQuestions(){
    return this.http.get(
      environment.APP_URL + 'my-questions',
      { withCredentials: true }
    );
  }
}
