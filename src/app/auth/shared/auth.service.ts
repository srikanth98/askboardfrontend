import { Injectable,Output,EventEmitter, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignUpRequest } from '../signup/signup-requestmodel';
import { Observable, from } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import {pipe} from 'rxjs';
import {map,tap} from 'rxjs/operators';
import {LoginRequest} from '../login/login-request';
import {LoginResponse} from '../login/login-response';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl
  @Output() emitUserLoggedIn = new EventEmitter<boolean>();
  @Output() emitUsername = new EventEmitter<String>();
  constructor(private httpClient:HttpClient,private localStorage:LocalStorageService) {

   }

   signup(signupRequest:SignUpRequest):Observable<any>
   {
     return this.httpClient.post(this.baseUrl+'/api/auth/signup',signupRequest,{responseType:'text'});
   }

   login(loginRequest:LoginRequest):Observable<boolean>
   {
     return this.httpClient.post<LoginResponse>(this.baseUrl+'/api/auth/login',loginRequest).pipe(map(data=>{
      this.localStorage.store('authenticationToken',data.token);
      this.localStorage.store('username',data.name);
      this.localStorage.store('refreshToken',data.refreshToken);
      this.localStorage.store('expiresAt',data.expiresAt);
      this.emitUserLoggedIn.emit(true);
      this.emitUsername.emit(data.name);
      return true;
     }));
   }

   getJWTToken()
   {
     return this.localStorage.retrieve('authenticationToken');
   }

   refreshToken()
   {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.httpClient.post<LoginResponse>(this.baseUrl+'/api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.token);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));

     }

     getRefreshToken()
     {
       return this.localStorage.retrieve('refreshToken');

      }

      getUsername()
      {
        return this.localStorage.retrieve('username');
      }

      loginCheck()
      {
        console.log("Login check");
        var ans:boolean= this.getJWTToken()!=null;
        console.log("Emit true");
        console.log(ans);
        this.emitUserLoggedIn.emit(ans);
        if(ans) this.emitUsername.emit(this.getUsername());
        return ans;
      }

      logout()
      {
        console.log("Logout");
        this.httpClient.post(this.baseUrl+'/api/auth/logout',this.refreshToken);
        this.localStorage.clear('refreshToken');
        this.localStorage.clear('username');
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        console.log("Emit false");
        this.emitUserLoggedIn.emit(false);
        this.emitUsername.emit(null);
      }
}
