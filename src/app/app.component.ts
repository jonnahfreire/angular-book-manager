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

  handleDeleteBook(id: number): void {
    console.log(`Deletando livro de id: ${id}`)
    this.books = this.books.filter(book => book.id !== id);
  }
  
  handleEditBook(id: number): void {
    console.log(`Editando livro de id: ${id}`)
  }
}
