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

  ngOnInit(): void {
    this.bookService.showAllBooks().subscribe((books) => this.books.set(books));
  }

  createHandler() {
    //save form inputs for passage to methods
    let book = {
      title: this.newBook.value.title!,
      author: this.newBook.value.author!,
      read: this.newBook.value.read!,
    };
    this.bookService.createBook(book).subscribe({
      next: (createBook) => {
        //wait till createbook before reload
        this.showAllHandler(); //reload list (could be problem if many book)
        this.newBook.reset(); //reset form
      }
    });
   
  }

  showAllHandler(){
    console.log("show all fires");
    this.bookService.showAllBooks().subscribe((books) => this.books.set(books));
  }

  showBookByIDHandler(){}

  updateHandler(){}

  deleteHandler(){}

}
