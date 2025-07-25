import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../shared/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthenticateService, private router: Router){}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  loginHandler(){
    this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
      next: (res: any) => {
        console.log('Logged in with token', res.token) //FOR DEVELOPMENT ONLY
        this.authService.setToken(res.token); // pass response token to authservice method
        this.router.navigate(['/book-list']) //currently not a route
      },
      error: (error: any) => {
        console.error('Login error', error)
      }
    })
  }
}
