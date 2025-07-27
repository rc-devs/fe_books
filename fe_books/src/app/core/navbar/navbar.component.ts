import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AuthenticateService } from '../../../shared/services/authenticate.service';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent, LogoutComponent, RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthenticateService){}

  
}
