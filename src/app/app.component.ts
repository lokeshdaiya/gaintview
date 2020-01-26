import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ABC College of Engineering';

  get isAuthenticated() {
    return this.userSvc.isAuthenticated;
  }
  constructor(private userSvc: UserService, private router: Router) {

  }

  logout() {
    sessionStorage.removeItem('token');
    this.userSvc.token = null;
    this.router.navigate(['login']);
  }
}
