import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSvc: UserService, private router: Router) { }

  canActivate() {
     if (this.userSvc.isAuthenticated) { return true; }
      this.router.navigate(['login']);
      return false;
  }
}
