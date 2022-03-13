import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(private authService: AuthService) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.pattern("[a-zA-Z .]*"), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('',  Validators.required),
    passwordRepeat: new FormControl('',  Validators.required),
  });

  onSubmit() : void {
    
    if( this.registerForm.value.password !== this.registerForm.value.passwordRepeat){
      this.registerForm.controls.passwordRepeat.setErrors({no_match: true})
    }
    
    if (!this.registerForm.valid) {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control.markAsTouched({ onlySelf: true });
       });
     } else {

      this.authService.register({
        username: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password:this.registerForm.value.password,
      })

     }
  }

}
