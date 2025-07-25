import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router ) {}

  login(username: string, password:string){
    return this.http.post<{token: string}>('http://localhost:3000/login', {
      username,
      password
    })
  }

  getToken(token: string){
    localStorage.setItem('token', token);
    this.tokenSubject.next(token)
  }

  isLoggedIn(){}

  logout(){}
}
