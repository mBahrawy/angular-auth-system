import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from './../interfaces/user';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  token!: string

  constructor(private authService: AuthService) {
    this.authService.token.subscribe(token => this.token = token);

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        ...(this.token && {'Authorization': this.token})
      }
    })

    return next.handle(request);

  }
}
