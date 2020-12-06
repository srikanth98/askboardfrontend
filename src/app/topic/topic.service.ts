import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { topicModel } from './topic-response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class topicService {
  createtopic(topicModel: topicModel):Observable<topicModel> {

    return this.httpClient.post<topicModel>('http://localhost:8484/api/topic',topicModel);
  }

  constructor(private httpClient:HttpClient) {

    
   }
   getAlltopics():Observable<Array<topicModel>>
    {
     return this.httpClient.get<Array<topicModel>>('http://localhost:8484/api/topic');
    }
}
