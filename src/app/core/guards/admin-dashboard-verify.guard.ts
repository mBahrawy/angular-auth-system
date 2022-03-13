import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardVerifyGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      const role = this.authService?.userData?.auth?.role || '' 

      if(role === 'admin') {
        return true
      } else { 
        this.authService.logout()
        return false
      }
  }
}
