import { Component, OnInit } from '@angular/core';
import { Book } from './Book';
import { BookService } from './services/book/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books!: Book[];

  constructor(private bookService: BookService) {
    this.loadBooks();
  }
  
  ngOnInit(): void { }

  loadBooks() {
    this.bookService
      .getAll()
      .subscribe(books => this.books = books);
  }

  getBooksByUserId(id: number): Book[] {
    const books = this.books?.filter(book => book.idowner === id);
    return books;
  }
}
