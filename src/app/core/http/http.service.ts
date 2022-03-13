import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  loginHandler(loginData: any): any {
    return this.http
      .post(`${environment.backend_server}/login/`, loginData)
      .pipe(
        map((response: any) => {
          const modifiedResponse: User = {
            id: response.data.id,
            name: response.data.username,
            auth: {
              role: response.data.role,
              token: response.token,
              expiresIn: Number(response.expiresIn),
            },
          };
          return modifiedResponse;
        })
      );
  }

  registerHandler(registerData: any): any {
    return this.http.post(
      `${environment.backend_server}/register/`,
      registerData
    );
  }

  getAllUsers() {
    return this.http.get(`${environment.backend_server}/all-users/`).pipe(
      map((response: any) => {
        const newResponse = response.data.map((item) => {
          return {
            name: item.username,
            id: item._id,
            email: item.email,
          };
        });
        return newResponse;
      })
    );
  }

  deleteUser(id:string){
    return this.http.delete(`${environment.backend_server}/user/${id}`);
  }
  
}
