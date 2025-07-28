import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../shared/services/authenticate.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthenticateService, private router:Router, private matSnackBar: MatSnackBar){}

  signUpForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("",[Validators.required]),
    password_confirmation: new FormControl("", [Validators.required]),
  })

  signUpHandler(){
    this.authService.signUp(this.signUpForm.value.username!, this.signUpForm.value.password!, this.signUpForm.value.password_confirmation!).subscribe({
      next: (res: any) => {
        this.matSnackBar.open("Sign-up successful! You may now use your login credentials!", 'Close')
        this.signUpForm.reset()
      },
      error: (error: any) => {
        this.matSnackBar.open("There was some error during sign-up. Ensure your passwords are matching, and try again.", 'Close')
        console.error('Sign up error', error)
      }
    })
  }
}
