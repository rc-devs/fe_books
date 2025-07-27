import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../shared/services/book.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-creation',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './book-creation.component.html',
  styleUrl: './book-creation.component.css'
})
export class BookCreationComponent {
  
  constructor(private bookService: BookService, private router:Router, private snackBar: MatSnackBar){}

  newBook = new FormGroup({
    title: new FormControl("", Validators.required), 
    author: new FormControl("", Validators.required),
    read: new FormControl(false)
  });

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
          this.bookService.showAllBooks; //reload list (could be problem if many book)
          this.newBook.reset(); //reset form
          this.router.navigate(['/book-list']); //remove once nav button to index/booklist added
          this.snackBar.open(`${book.title} by ${book.author} has been successfully added to your list.`, 'Close')
        }
        // could suscribe to errors i guess
      });
    };
}
