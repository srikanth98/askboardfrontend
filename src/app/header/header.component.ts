import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn:boolean;
  username:String;
  constructor(private authService:AuthService,private router:Router) { 

  }

  ngOnInit(): void {
    console.log("INIT HEADER");
    this.authService.emitUserLoggedIn.subscribe((data:boolean)=>this.userLoggedIn=data);
   this.authService.emitUsername.subscribe((data:string)=>this.username=data);
   this.authService.loginCheck();
  }

  showProfile()
  {
      this.router.navigateByUrl("/view-profile/"+this.username);
  }
  logout()
  {
      this.authService.logout();
      this.userLoggedIn=false;
      this.username="";
      this.router.navigateByUrl("/");

  }
}
