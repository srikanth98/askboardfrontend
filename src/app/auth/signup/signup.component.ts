import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpRequest } from './signup-requestmodel';
import { AuthService } from '../shared/auth.service';
import {ReactiveFormsModule} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  signupRequest:SignUpRequest;
  constructor(private authService:AuthService,private router:Router,private toastr:ToastrService) { 
    this.signupRequest= {
     username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
    });
  }

  signup():void{

    this.signupRequest.username=this.signupForm.get('username').value;
    this.signupRequest.password=this.signupForm.get('password').value;
    this.signupRequest.email=this.signupForm.get('email').value;

    this.authService.signup(this.signupRequest).subscribe(
      ()=>{
        this.router.navigate(['/login'],
        {queryParams:{registered:'true'}});
      },
      ()=>
      {
        this.toastr.error('Registration Failed.Please try again');
      }  
    );
  }

}
