import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {PostModel} from '../../PostModel'
import { from } from 'rxjs';
import {faArrowUp, faArrowDown, faComments} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  posts : Array<PostModel> = [];
 
  faComments=faComments
  constructor(private postService:PostService,private router:Router) {

    this.postService.getAllPosts().subscribe(post=>{
      this.posts = post;
  });
   }

  ngOnInit(): void {
  }
  goToPost(id:Number)
  {
        this.router.navigateByUrl('view-post/'+id);
  }

}
