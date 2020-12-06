import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginResponse } from './login-response';
import { LoginRequest } from './login-request';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { isError } from 'util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  loginRequest:LoginRequest;
  registerSuccessMessage:String;
  isError:boolean;
  constructor(private authService:AuthService,private toastr:ToastrService,private router:Router,
    private activatedRoute:ActivatedRoute) { 
    this.loginRequest={
      username:'',
      password:'',
      
    },
    this.registerSuccessMessage='',
    this.isError=false
  
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
    {
     username:new FormControl('',Validators.required),
     password:new FormControl('',Validators.required),
    }
    );
    this.activatedRoute.queryParams.subscribe(
      params=>{
        if(params.registered!==undefined && params.registered==true)
        {
          this.toastr.success('Signup successful.');
          this.registerSuccessMessage="Please activate your account";
        }
      }
    );

  }

  login()
  {
    this.loginRequest.username=this.loginForm.get('username').value;
    this.loginRequest.password=this.loginForm.get('password').value;
    this.authService.login(this.loginRequest).subscribe(
      data=>{
        if(data)
        {
          this.isError = false;
          this.router.navigateByUrl('/');
          this.toastr.success('Login success!');
        }
        else
        {
          this.isError=true;
        }
      }
      );
  }

  
}
