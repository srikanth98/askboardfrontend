import { Component, OnInit } from '@angular/core';
import { PostModel } from '../PostModel';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


 
  constructor(private postService:PostService) { 
    
  }

  ngOnInit(): void {

    
  }

  
}
