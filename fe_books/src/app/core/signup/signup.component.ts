import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm = new FormGroup({
    username: new FormControl([Validators.required]),
    password: new FormControl([Validators.required]),
    password_confirmation: new FormControl([Validators.required]),
  })

}
