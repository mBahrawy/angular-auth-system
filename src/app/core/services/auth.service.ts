import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;
  public userData! : User;

  constructor(
    private router: Router,
    private httpService:HttpService
  )  {
    this.tokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));
    this.token = this.tokenSubject.asObservable();
  }

  isLoggedIn () {
    return !!this.tokenSubject.value
  }

  logout() {
    localStorage.removeItem('token');
    this.userData = null;
    this.tokenSubject.next(null);
    this.router.navigate(['/auth/login'])
  }

  login(email: string, password:string) {
   this.httpService.loginHandler({email, password})
    .subscribe(
      (response: User)=> {
        localStorage.setItem('token', JSON.stringify(response.auth.token));
        this.userData = response;
        this.tokenSubject.next(response.auth.token);
        this.router.navigate([`/dashboard/${response.auth.role}`])
      },
      (error)=> { console.log(error);
       }
    )
  }

  register(registerData) { 
    this.httpService.registerHandler(registerData)
    .subscribe(
      (response)=> {
        this.router.navigate(['/auth/login'], {queryParams: {email: response.email}})
      },
      (error)=> { console.log(error);
       }
    )
  }



}
