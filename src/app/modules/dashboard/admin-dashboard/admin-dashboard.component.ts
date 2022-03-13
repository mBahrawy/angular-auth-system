import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from 'src/app/core/interfaces/user';
import { DashboardService } from './../../../core/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  users!: User[];

  constructor(
    private dashboardService: DashboardService,
    private httpService: HttpService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsersHandler();
  }

  getAllUsersHandler() {
    this.httpService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(id: string){
    this.httpService.deleteUser(id).subscribe(
      (response: any) => {
        this.toastrService.success(response.message)
        this.users = this.users.filter(user=> user.id !== id)       
      },
      (error) => {
        console.log(error);
      }
    )
  } 
}
