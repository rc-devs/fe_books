import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Book>(this.url, book, { headers })
  }

  showAllBooks(): Observable<Book[]>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Book[]>(this.url, { headers })
  }

  showBookByID(id: number): Observable<Book>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Book>(`${this.url}/${id}`, { headers })
  }

  updateBook(book: Book): Observable<Book>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Book>(`${this.url}/${book.id}`, book, { headers })
  }

  deleteBook(id: number): Observable<Book>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<Book>(`${this.url}/${id}`, { headers })
  }
}
