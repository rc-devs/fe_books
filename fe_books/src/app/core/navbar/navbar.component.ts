import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AuthenticateService } from '../../../shared/services/authenticate.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent, LogoutComponent, SignupComponent, RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthenticateService){}

  
}
