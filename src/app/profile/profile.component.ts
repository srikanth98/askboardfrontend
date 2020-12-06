import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentPayload } from '../comments/comment-payload';
import { PostModel } from '../PostModel';
import { CommentService } from '../shared/comment-service.service';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:String;
  posts : Array<PostModel> = [];
  constructor(private router:ActivatedRoute,private postService:PostService, private commentService:CommentService ) { }

  ngOnInit(): void 
  {
      this.userName=this.router.snapshot.params.userID;
      this.postService.getAllByUsername(this.userName).subscribe(
        data=>
        {
          this.posts = data;
          console.log(data);
        } ,
        err=>
        {
          console.log(err);
        }
      );
      
  }

}
