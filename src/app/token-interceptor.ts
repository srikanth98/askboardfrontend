import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth/shared/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError,switchMap,filter,take } from 'rxjs/operators';
import { LoginRequest } from './auth/login/login-request';
import { LoginResponse } from './auth/login/login-response';


@Injectable({
    providedIn:'root'
})

export class TokenInterceptor implements HttpInterceptor
{
    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(public authService:AuthService)
    {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    //Skip login as we shouldn't attach jwt to it.

    if(req.url.indexOf('login')!=-1) return next.handle(req);
    const jwtToken = this.authService.getJWTToken();
    if(jwtToken)
    {
    return next.handle(this.addToken(req,jwtToken)).pipe(catchError(err=>{
        if(err instanceof HttpErrorResponse && err.status === 403)
        {
            console.log("Caught 403---for req");
            console.log(req);
            return this.handleAuthErrors(req,next);
        }
        else return throwError(err);
    }));
    }
    return next.handle(req);

}

private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
        this.isTokenRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.authService.refreshToken().pipe(
            switchMap((refreshTokenResponse: LoginResponse) => {
                this.isTokenRefreshing = false;
                this.refreshTokenSubject
                    .next(refreshTokenResponse.token);
                return next.handle(this.addToken(req,
                    refreshTokenResponse.token));
            })
        )
    } else {
        return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap((res) => {
                return next.handle(this.addToken(req,
                    this.authService.getJWTToken()))
            })
        );
    }
}

addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
        headers: req.headers.set('Authorization',
            'Bearer ' + jwtToken)
    });
}

}