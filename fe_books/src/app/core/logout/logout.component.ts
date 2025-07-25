import { Component } from '@angular/core';
import { AuthenticateService } from '../../../shared/services/authenticate.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthenticateService){}

  logoutHandler(){
    this.authService.logout()
  }
}
