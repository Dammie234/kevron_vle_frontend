import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(inputData: any){
    let formParams = new FormData();
    formParams.append('file', inputData.file);
    formParams.append('module', inputData.module)
    formParams.append('assessment', inputData.assessment)
    return this.http.post(
      environment.APP_URL + 'assessment-answer',
      formParams,
      { withCredentials: true }
    );
  }
}
