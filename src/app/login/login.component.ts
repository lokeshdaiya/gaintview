import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: any;

  constructor(private router: Router, private userSvc: UserService) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.userSvc.token = token;
      this.router.navigate(['/students']);
    }
  }

  ngOnInit() {
    this.createLoginForm();
  }

  login() {
    const user = this.loginForm.value;
    this.userSvc.login(user)
    .subscribe((response: any) => {
      this.userSvc.token = response.accessToken;
      sessionStorage.setItem('token', this.userSvc.token);
      this.router.navigate(['/students']);
    }, (e) => {
      this.loginError = e.error.error;
      setTimeout(() => {
        this.loginError = '';
      }, 3000);
    });
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

}
