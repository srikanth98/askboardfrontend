import { Component, OnInit,Input } from '@angular/core';
import {PostModel} from '../../PostModel';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import {ToastrService} from 'ngx-toastr';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-vote-view',
  templateUrl: './vote-view.component.html',
  styleUrls: ['./vote-view.component.css']
})
export class VoteViewComponent implements OnInit {

  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown=faArrowDown;
  votePayload:VotePayload;
  constructor(private voteService:VoteService,private toastr:ToastrService,private postService:PostService) { }

  ngOnInit(): void {
    
  }

  upvotePost()

  {
      this.votePayload={
        voteType:VoteType.UPVOTE,
        postId:this.post.id
      }
      this.voteService.vote(this.votePayload).subscribe(
        data=>
        {
            //this.toastr.success("Voted!");
            this.postService.getPost(this.post.id).subscribe(
              data=>{
                this.post = data;
              },
              err=>
              {
                throwError(err);
              }
              
            );
          
        },
        err=>
        {
          if(err.status==401|| err.status==403) this.toastr.error("Please login to vote!");
          //this.toastr.error(err.status);
        }
      )
  }


  downvotePost()
    {
       
      this.votePayload={
        voteType:VoteType.DOWNVOTE,
        postId:this.post.id
      }
      this.voteService.vote(this.votePayload).subscribe(
        data=>
        {
          //this.toastr.success("Voted!");
          this.postService.getPost(this.post.id).subscribe(
            data=>{
              this.post = data;
            },
            err=>
            {
              
              throwError(err);
            }
            
          );
        },
        err=>
        {
          if(err.status==401 || err.status==403) this.toastr.error("Please login to vote!");
         // this.toastr.error(err.status);
        }
      )
    }

}
