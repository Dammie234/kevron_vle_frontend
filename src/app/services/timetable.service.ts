import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient) { }

  store(inputData: any){
     let formParams = new FormData();
     formParams.append('category', inputData.category);
     formParams.append('title', inputData.title);
     formParams.append('file', inputData.file);
    return this.http.post(
      environment.APP_URL +  'timetables',
      formParams,
      { withCredentials: true }
    );
  }

  index(){
    return this.http.get(
      environment.APP_URL + 'timetables',
      { withCredentials: true }
    );
  }

  show(id: any){
    return this.http.get(
      environment.APP_URL + `timetables/${id}`,
      { withCredentials: true }
    );
  }

  update(inputData: any, id: any){

    return this.http.patch(
      environment.APP_URL + `timetables/${id}`,
      inputData,
      { withCredentials: true }
    );
  }

}
