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

  selectedFile: File | null = null;

  newBook = new FormGroup({
    title: new FormControl("", Validators.required), 
    author: new FormControl("", Validators.required),
    read: new FormControl(false)
  });

   onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  };

  createHandler() {
      console.log('createhandler fires');
      
      //save form inputs for passage to methods
      let book = {
        title: this.newBook.value.title!,
        author: this.newBook.value.author!,
        read: this.newBook.value.read!,
      };

      if (this.newBook.valid && this.selectedFile){
        const formData = new FormData();
        formData.append('cover_image', this.selectedFile, this.selectedFile.name);

        this.bookService.createBook(book).subscribe({
        next: (createBook) => {
          //wait till createbook before reload
          this.bookService.showAllBooks; //reload list (could be problem if many book)
          this.newBook.reset(); //reset form
          this.snackBar.open(`${book.title} by ${book.author} has been successfully added to your list.`, 'Close', {duration: 5000})
        },
        // suscribe to errors i guess
        error: (error: any) => {
          this.snackBar.open('Error creating book','Close', error); // no duration so user can see
      }});
      }

      
    };
}
