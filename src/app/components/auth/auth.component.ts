import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  authForm: FormGroup;
  isLogin: boolean = true;

  constructor( private router: Router ){}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(), 
      'password': new FormControl()
    });
  }

  onLogin(){
    if(this.authForm.valid)
      this.router.navigate(['/notes']);
  }

  onSignUp(){
    this.authForm.reset();
    this.isLogin = !this.isLogin;
  }
}
