import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthenticateService } from '../shared/services/authenticate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fe_books';

  constructor(public authService: AuthenticateService){}
}
