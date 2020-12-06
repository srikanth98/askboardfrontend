import { Component, OnInit } from '@angular/core';
import {topicService} from '../../topic/topic.service'
import { topicModel } from 'src/app/topic/topic-response';

@Component({
  selector: 'app-sub-sidebar',
  templateUrl: './sub-sidebar.component.html',
  styleUrls: ['./sub-sidebar.component.css']
})
export class SubSidebarComponent implements OnInit {

  
  topics : Array<topicModel>;
  displayViewAll:Boolean;
  constructor(private topicService:topicService) {
  
    this.topicService.getAlltopics().subscribe(data => {
      this.topics = data
    }
    );
  }

  ngOnInit(): void {
  }

}
