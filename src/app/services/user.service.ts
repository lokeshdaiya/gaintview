import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiBaseUrl;
  token: any;
  loginError: any;

  get isAuthenticated() {
    return this.token !== undefined && this.token !== null;
  }
  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post(`${this.baseUrl}/user/login`, user);
  }
}
