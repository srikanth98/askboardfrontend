import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/PostModel';
import { PostService } from 'src/app/shared/post.service';
import {ActivatedRoute} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.css']
})
export class ViewtopicComponent implements OnInit {

  posts : Array<PostModel> = [];
  topicID:Number;
  constructor(private postService:PostService,private activatedRoute:ActivatedRoute)
   {

    }

  ngOnInit(): void {

    this.topicID=this.activatedRoute.snapshot.params.topicID;
    this.postService.getAllPostsByTopic(this.topicID).subscribe(
    data=>
    {
      console.log("Posts ");
      console.log(data);
      this.posts=data;
    }
    );
    
  }

}
