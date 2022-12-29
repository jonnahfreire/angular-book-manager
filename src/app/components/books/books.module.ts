import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListBooksComponent } from 'src/app/components/books/list-books/list-books.component';


@NgModule({
  declarations: [
    ListBooksComponent
  ],
  imports: [CommonModule],
  exports: [ ListBooksComponent ]
})
export class BooksModule { }
