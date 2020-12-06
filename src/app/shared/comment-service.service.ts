import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from '../comments/comment-payload';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  getAllCommentsByPost(id:Number):Observable<Array<CommentPayload>>
  {
      return this.httpClient.get<Array<CommentPayload>>(this.baseUrl+'/api/comments/byPost/'+id);
  }
  getAllCommentsByUser(userName:String):Observable<Array<CommentPayload>>
  {
      return this.httpClient.get<Array<CommentPayload>>(this.baseUrl+'/api/comments/byUser/'+userName);
  }
  postComment(comment:CommentPayload):Observable<any>
  {
      return this.httpClient.post<CommentPayload>(this.baseUrl+'/api/comments',comment);
  }
}
