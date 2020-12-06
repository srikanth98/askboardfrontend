import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../PostModel';
import { Observable } from 'rxjs';
import { createPostPayload } from '../post/create-post/create-post-payload';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  
   baseUrl = environment.baseUrl;
  getAllPostsByTopic(topicID: Number):Observable<Array<PostModel>> {
    return this.httpclient.get<Array<PostModel>>(this.baseUrl+'/api/posts/byTopic/'+topicID)
  }
 
  getAllByUsername(username:String):Observable<Array<PostModel>>{
    return this.httpclient.get<Array<PostModel>>(this.baseUrl+'api/posts/byUser/'+username);
  }

  constructor(private httpclient:HttpClient) {

   }

     getAllPosts():Observable<Array<PostModel>>
   {
    return this.httpclient.get<Array<PostModel>>(this.baseUrl+'/api/posts/');
   }

   createPost(createPostPayload):Observable<createPostPayload>
   {
      return this.httpclient.post<createPostPayload>(this.baseUrl+'/api/posts/',createPostPayload);
   }

   getPost(postId: Number):Observable<PostModel> {
    return this.httpclient.get<PostModel>(this.baseUrl+'/api/posts/byPost/'+postId);
  }
}
