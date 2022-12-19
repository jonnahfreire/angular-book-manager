import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Book } from 'src/app/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private API = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API);
  }
}
