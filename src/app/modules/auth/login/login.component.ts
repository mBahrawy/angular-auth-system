import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  justRegisteredEmail! : string;
  loginForm: FormGroup;

  ngOnInit(): void {
    this.justRegisteredEmail = this.route.snapshot.queryParamMap.get('email') || '';
    this.loginForm = new FormGroup({
      email: new FormControl(this.justRegisteredEmail, [Validators.email, Validators.required]),
      password: new FormControl('',  Validators.required),
    });
  }

  onSubmit() : void{
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
       });

     } else {
      // Form is validated 
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
     }
  }


}
