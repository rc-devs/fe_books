import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-book-list',
  imports: [ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  books: WritableSignal<Book[]> = signal<Book[]>([]);

  constructor(private bookService: BookService){}

  //use reactive form
  newBook = new FormGroup({
    title: new FormControl("", Validators.required), 
    author: new FormControl("", Validators.required),
    read: new FormControl(false)
  })

  book = this.newBook.value;

  ngOnInit(): void {
    this.bookService.showAllBooks().subscribe(books => this.books.set(books)), console.log(this.books);
  }

  createHandler(book: {title: string, author: string, read: boolean}){
    this.bookService.createBook(book);
  }

  showAllHandler(){
    this.bookService.showAllBooks().subscribe(books => this.books.set(books))
  }

  showBookByIDHandler(){}

  updateHandler(){}

  deleteHandler(){}

}
