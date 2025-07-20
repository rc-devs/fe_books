import { Component } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  constructor(private bookService: BookService){}

  createHandler(){}

  showAllHandler(){}

  showOneHandler(){}

  updateHandler(){}

  deleteHandler(){}

}
