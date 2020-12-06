import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { topicModel } from '../topic-response';
import { topicService } from '../topic.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreatetopicComponent implements OnInit {

  createtopicForm:FormGroup;
  topicModel:topicModel;
  title = new FormControl('');
  description = new FormControl('');
  constructor(private topicService:topicService,private router:Router) {

    this.createtopicForm = new FormGroup({
      title:new FormControl('',Validators.required),
      description: new FormControl('',Validators.required)
    });

    this.topicModel = {
      name:'',
      description:''
    };
   }

  ngOnInit(): void {
  }

  createtopic()
  {

    this.topicModel.name = this.createtopicForm.get('title').value;
    this.topicModel.description = this.createtopicForm.get('description').value;
    this.topicService.createtopic(this.topicModel).subscribe(
      data=>{
        this.router.navigateByUrl('/list-topics');
      },
      err=>
      {
        console.log("Error while creating topic.");
        console.log(err);
        throwError(err);
      }
    )
    
  }

  discard()
  {
      this.router.navigateByUrl('/');
  }

}
