import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { topicModel } from './topic-response';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class topicService {

  baseUrl = environment.baseUrl
  createtopic(topicModel: topicModel):Observable<topicModel> {

    return this.httpClient.post<topicModel>(this.baseUrl+'/api/topic',topicModel);
  }

  constructor(private httpClient:HttpClient) {

    
   }
   getAlltopics():Observable<Array<topicModel>>
    {
     return this.httpClient.get<Array<topicModel>>(this.baseUrl+'/api/topic');
    }
}
