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

  createBook(book: {title: string, author: string, read: boolean}): Observable<Book>{
    return this.http.post<Book>(this.url, book)
  }

  showAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url)
  }

  showBookByID(id: number): Observable<Book>{
    return this.http.get<Book>(`${this.url}/${id}`)
  }

  updateBook(book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.url}/${book.id}`, book)
  }

  deleteBook(id: number): Observable<Book>{
    return this.http.delete<Book>(`${this.url}/${id}`)
  }
}
