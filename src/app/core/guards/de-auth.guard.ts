import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class DeAuthGuard implements CanActivate {
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const role = this.authService?.userData?.auth.role || '' 

    if (!this.authService.isLoggedIn()) {
      return true;
    }
     this.router.navigate([`dashboard/${role}`]);
    return false;
  }
}
