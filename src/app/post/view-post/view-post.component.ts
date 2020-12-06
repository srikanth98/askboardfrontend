import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { PostViewComponent } from 'src/app/shared/post-view/post-view.component';
import { PostModel } from 'src/app/PostModel';
import { throwError, from } from 'rxjs';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/shared/comment-service.service';
import { CommentPayload } from 'src/app/comments/comment-payload';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  faComments=faComments;
  postId:Number;
  post:PostModel;
  commentForm:FormGroup;
  commentText=new FormControl('');
  comment:CommentPayload;
  comments:Array<CommentPayload>;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private postService:PostService,private commentService:CommentService,private toastr:ToastrService) {

      this.postId=this.activatedRoute.snapshot.params.id;

      this.postService.getPost(this.postId).subscribe(
      data=>{
        this.post=data;
        console.log("Retrieved post");
        console.log(this.post);
      },
      err=>
      {
        if(err.status==500)
        {
            this.toastr.error("Post Not found.");
            this.router.navigateByUrl("");
        }
        
      });
      
    this.commentForm = new FormGroup({
          commentText:new FormControl('',[Validators.required,Validators.minLength(4)])
      });

      this.updateComments();
   }

  ngOnInit(): void {
    this.comment={
      postId:this.postId,
      text:''
    }
  }
  
  addComment()
  {
    
      this.comment.text=this.commentForm.get('commentText').value;
      this.commentService.postComment(this.comment).subscribe(
        data=>
        {
          /*console.log(data);
          this.comments.push(data)*/
          this.updateComments();
        },
        err=>
        {
          if(err.status==401 || err.status==403) this.toastr.error("Please login to comment");
        }
      )
      
  }

  updateComments()
  {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(
      data=>
      {
         
          this.comments=data;
      },
      err=>
      {
        console.log(err);
      }
    );
  }

}
