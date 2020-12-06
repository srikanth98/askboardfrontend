import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../shared/comment-service.service';
import { CommentPayload } from './comment-payload';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  constructor(private commentService:CommentService) { }
  
  @Input() comment;
  ngOnInit(): void 
  {
   
  }

 

}
