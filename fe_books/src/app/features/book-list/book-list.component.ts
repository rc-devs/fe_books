import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../shared/models/book';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  books: WritableSignal<Book[]> = signal<Book[]>([]);
  displayUpdateContainer = signal<Boolean>(false);
  selectedBook = signal<Book | null>(null);

  constructor(private bookService: BookService, private snackBar: MatSnackBar){}

  //use reactive form
  newBook = new FormGroup({
    title: new FormControl("", Validators.required), 
    author: new FormControl("", Validators.required),
    read: new FormControl(false)
  })

   findSingleBookForm = new FormGroup({
    bookID: new FormControl(0, Validators.required)
  })

  updateBookForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl(""), 
    author: new FormControl(""),
    read: new FormControl(false)
  })

  ngOnInit(): void {
    this.bookService.showAllBooks().subscribe((books) => this.books.set(books));
  }

  createHandler() {
    console.log('createhandler fires');
    
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
        this.displayUpdateContainer.set(false)
      }
      // could suscribe to errors i guess
    });
   
  }

  showAllHandler(){
    console.log("show all fires");
    this.bookService.showAllBooks().subscribe((books) => this.books.set(books));
  }

  showBookByIDHandler(){
    let bookID = Number(this.findSingleBookForm.value.bookID!);
    this.bookService.showBookByID(bookID).subscribe({
      next: (book) => this.books.set([book]),
      error: (err) => {
        this.snackBar.open('Error fetching book: ' + err.message, 'Close', {duration: 5000});
      }
    });
    this.findSingleBookForm.reset();
  }

    selectBookForUpdate(book: Book) {
    this.selectedBook.set(book);
    this.displayUpdateContainer.set(true);
    
    // populate form with data from selected book
    this.updateBookForm.patchValue({
      id: book.id,
      title: book.title,
      author: book.author,
      read: book.read
    });
  }

  cancelUpdate(book: Book){
    this.displayUpdateContainer.set(false)

    //reset to original values
    this.updateBookForm.patchValue({
      id: book.id,
      title: book.title,
      author: book.author,
      read: book.read
    });
  }
  
  updateHandler(){
    let book = {
      id: this.updateBookForm.value.id!,
      title: this.updateBookForm.value.title!,
      author: this.updateBookForm.value.author!,
      read: this.updateBookForm.value.read!,
    };
    this.bookService.updateBook(book).subscribe({
      next: (updateBook) => {
        //wait till updateBook before reload
        this.showAllHandler(); //reload list (could be problem if many book)
        this.displayUpdateContainer.set(false)
        this.updateBookForm.reset(); //reset form
      }
      // could suscribe to errors i guess
    });
  }

  deleteHandler(bookID: number, title: string, author: string){
    if (confirm(`Are you sure you want to DELETE book ${bookID}; ${title} by ${author}?`)){
    this.bookService.deleteBook(bookID).subscribe({next: (deleteBook) => {
            //wait till deletebook before reload
            this.showAllHandler(); 
            this.newBook.reset(); //reset form
          }
        });
    } else {
      return;
    }
  }
}
