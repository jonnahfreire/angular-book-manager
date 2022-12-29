import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { authState } from 'src/app/store/app.reducers';
import { selectAuthenticatedUserBooks } from 'src/app/store/app.selectors';
import { AuthState, Book } from 'src/app/store/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  
  constructor(private store: Store<{ auth: AuthState }>) { }

  ngOnInit(): void {
    this.loadUserData();
  }
  
  loadUserData(): void {
    this.store.select(selectAuthenticatedUserBooks)
      .subscribe(books => {
        this.books = books!;
      });
  } 
    
  handleDeleteBook(id: number): void {
    console.log(`Deletando livro de id: ${id}`)
    this.books = this.books?.filter(book => book.id !== id);
  }
    
  handleEditBook(id: number): void {
    console.log(`Editando livro de id: ${id}`)
  }
}
