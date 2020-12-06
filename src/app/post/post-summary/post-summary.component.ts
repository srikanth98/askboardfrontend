import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faArrowUp, faArrowDown, faComments} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.css']
})
export class PostSummaryComponent implements OnInit {

  @Input() post;
  faComments=faComments
  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  goToPost(id:Number)
  {
        this.router.navigateByUrl('view-post/'+id);
  }

}
