import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  isLoggedIn!: boolean;
  public navbarCollapsed = true;


  constructor(
    private authService: AuthService,
    private router:Router
  ) {
    this.authService.token.subscribe(token => this.isLoggedIn = !!token);

  }
  
  logout() {
    this.authService.logout()
  }

  navigateToDashboard() {
    const role = this.authService?.userData?.auth?.role 
    role ? this.router.navigate([`/dashboard/${role}`]) : this.authService.logout()
  }

  toggleCollapse() {
    if(window.innerWidth <= 991) {
      this.navbarCollapsed = !this.navbarCollapsed
    }
  }

}
