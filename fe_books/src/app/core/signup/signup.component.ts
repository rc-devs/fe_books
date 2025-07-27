import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../shared/services/authenticate.service';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthenticateService){}

  signUpForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("",[Validators.required]),
    password_confirmation: new FormControl("", [Validators.required]),
  })

  signUpHandler(){
    this.authService.signUp(this.signUpForm.value.username!, this.signUpForm.value.password!, this.signUpForm.value.password_confirmation!).subscribe()
  }
}
