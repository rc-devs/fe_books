import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor( private http: HttpClient) { }

  private url = 'http://localhost:3000/books'

  createBook(): Observable<Book>{

  }

  showBook(): Observable<Book[]>{

  }

  updateBook(): Observable<Book>{

  }

  deleteBook(): Observable<Book>{
    
  }
}
