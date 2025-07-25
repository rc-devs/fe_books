import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent, RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
