import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  authForm: FormGroup;
  isLogin: boolean = true;
  auth$: Observable<AuthResponseData>;

  constructor( private router: Router, private authService: AuthService ){}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(), 
      'password': new FormControl()
    });
  }

  onLogin(){
    if(this.authForm.valid){
      if(this.isLogin){
        this.auth$ = this.authService.login(this.authForm.get('email').value, this.authForm.get('password').value);
      }else{
        this.auth$ = this.authService.signup(this.authForm.get('email').value, this.authForm.get('password').value);
      }
      this.auth$.subscribe({
        next: () => {
              this.router.navigate(['/notes']);
            },
        error: errorRes => {
              alert(errorRes);
              this.authForm.reset();
            }
      });
    }
  }

  onSwitchMode(){
    this.authForm.reset();
    this.isLogin = !this.isLogin;
  }
}
