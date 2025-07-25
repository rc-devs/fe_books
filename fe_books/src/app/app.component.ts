import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './features/book-list/book-list.component';
import { LoginComponent } from './core/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookListComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fe_books';
}
