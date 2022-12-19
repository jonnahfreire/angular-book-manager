import { Component, Input } from '@angular/core';
import { Book } from 'src/app/Book';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent {
  @Input() books: Book[] = [];
}
