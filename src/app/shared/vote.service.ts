import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-view/vote-payload';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  baseUrl = environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  vote(votePayload:VotePayload):Observable<any>
  {   
      return this.httpClient.post(this.baseUrl+'/api/votes',votePayload);
  }
}
