import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor( private http: HttpClient) { }

  private url = 'https://beta-blogs-evening-zzzl.onrender.com/books'

  createBook(book: FormData): Observable<Book>{
    return this.http.post<Book>(this.url, book)
  }

  showAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url)
  }

  showMyBooks(): Observable<Book[]>{
    return this.http.get<Book[]>('https://beta-blogs-evening-zzzl.onrender.com/books/my_books')
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
