import { Component, OnInit } from '@angular/core';
import { topicService } from '../topic.service';
import { topicModel } from '../topic-response';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.css']
})
export class ListtopicsComponent implements OnInit {
  topics:Array<topicModel>;
  constructor(private topicService:topicService) { 

  }

  ngOnInit(): void {

    this.topicService.getAlltopics().subscribe(
      data=>{
              this.topics = data;
      },
      err=>
      {
          console.log("Error getting topic list");
          throwError(err);
      }

    )
  }



}
