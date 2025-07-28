import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthenticateService } from '../shared/services/authenticate.service';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './core/login/login.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fe_books';

  constructor(public authService: AuthenticateService){}
}
