import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
