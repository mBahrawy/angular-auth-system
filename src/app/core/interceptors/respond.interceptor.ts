import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { checkItemInArray } from '../../shared/helpers'
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RespondInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private toaster: ToastrService
    ) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
              console.log(`Error: ${error.error.message}`);
            }
            else {

              // Bad requests
              if(checkItemInArray(error.status, [400])){
                Object.values(error.error).forEach(error=> this.toaster.error(`${error}`))
                return throwError(errorMsg);
              }

              // Un authorized error
              if(checkItemInArray(error.status, [401,403])){
                  errorMsg = 'Unauthorized action'
                  this.toaster.error(errorMsg)
                  this.authService.logout()
                  return throwError(errorMsg);
              }

              // Other errors
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`
              console.log(errorMsg);
              this.toaster.error(error.error.message)

            }
            return throwError(errorMsg);
          })
        )
    }
}

