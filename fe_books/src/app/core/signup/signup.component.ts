import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../shared/services/authenticate.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthenticateService, private router:Router){}

  signUpForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("",[Validators.required]),
    password_confirmation: new FormControl("", [Validators.required]),
  })

  signUpHandler(){
    this.authService.signUp(this.signUpForm.value.username!, this.signUpForm.value.password!, this.signUpForm.value.password_confirmation!).subscribe({
      next: (res: any) => {
        console.log('Sign up success')
        this.router.navigate(['/login']) //currently not a route
      },
      error: (error: any) => {
        console.error('Sign up error', error)
      }
    })
  }
}
