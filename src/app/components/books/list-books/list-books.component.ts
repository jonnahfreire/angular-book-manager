import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/store/models';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent {
  @Input() books: Book[] = [];

  @Output() delete: EventEmitter<number> = new EventEmitter(); 
  @Output() edit: EventEmitter<number> = new EventEmitter(); 

  onDelete(id: number) {
    this.delete.emit(id);
  }
  
  onEdit(id: number) {
    this.edit.emit(id);
  }
}
