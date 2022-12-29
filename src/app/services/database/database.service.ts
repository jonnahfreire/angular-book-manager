import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Book, User } from 'src/app/store/models';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API}/books`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}/users`);
  }

  createUser(user: User) {
    this.http.post<User>(`${this.API}/users`, user).subscribe();
  }

  createBook(book: Book) {
    this.http.post<Book>(`${this.API}/books`, book).subscribe();
  }
}
