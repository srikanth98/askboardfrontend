import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import { topicService } from 'src/app/topic/topic.service';
import { topicModel } from 'src/app/topic/topic-response';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { createPostPayload } from './create-post-payload';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm:FormGroup;
  postName=new FormControl('');
  description=new FormControl('');
  selectedtopic =new FormControl('');
  topics:Array<topicModel>;
  currPost:createPostPayload;
  constructor(private topicService:topicService,private postService:PostService,private router:Router) {

    this.createPostForm = new FormGroup({
        postName:new FormControl('',Validators.required),
        description:new FormControl('',Validators.required),
        selectedtopic:new FormControl('')
    });
   }

  ngOnInit(): void {
    this.currPost={
      description:'',
      postName:'',
      topicName:''

  };
    this.topicService.getAlltopics().subscribe(
      data=>
      {
          this.topics = data;
          console.log(data);
      },
      err=>
      {
          console.log(err);
      }
    )

  }

  createPost()
  {
    this.currPost.description = this.createPostForm.get('description').value;
    this.currPost.postName = this.createPostForm.get('postName').value;
    this.currPost.topicName=this.createPostForm.get('selectedtopic').value;
     this.postService.createPost(this.currPost).subscribe(
        data=>
        {
            this.router.navigateByUrl("");
        },
        err=>
        {
            console.log(err);
        }
      );
  }

}
