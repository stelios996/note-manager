import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    signupUrl: string = environment.firebaseSignUpUrl;
    signinUrl: string = environment.firebaseSignInUrl;
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, pwd: string){
        return this.http.post<AuthResponseData>(this.signupUrl, {email: email, password: pwd, returnSecureToken: true}).pipe(
            catchError( this.handleError ),
            tap( res => this.handleAuth(res))
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(this.signinUrl, {email: email, password: password, returnSecureToken: true}).pipe(
            catchError( this.handleError ),
            tap( res => this.handleAuth(res))
        );
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }

    autoLogin(){
        const userData: { email:string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem('user')); 
        if(!userData)
            return;

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout( () => this.logout(), expirationDuration);
    }

    private handleAuth(authData: AuthResponseData){
        let expirationDate = new Date( new Date().getTime()+ +authData.expiresIn*1000);
        let user = new User(authData.email, authData.localId, authData.idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(+authData.expiresIn*1000);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private handleError( errorRes: HttpErrorResponse){
        let error = '';
        switch( errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                error = 'A user with this email already exists!';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                error = 'The credentials are incorrect!';
                break;
            case 'USER_DISABLED':
                error = 'The user account has been disabled!';
                break;
            default:
                error = 'An unexpected error has occured';
                break;
        }
        return throwError( () => error );
    }
}