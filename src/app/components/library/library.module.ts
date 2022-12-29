import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LibraryHeaderComponent } from './library-header/library-header.component';
import { OnlyFirstName } from './library-header/only-first-name.pipe';


@NgModule({
  declarations: [ LibraryHeaderComponent, OnlyFirstName ],
  imports: [ CommonModule ],
  exports: [ LibraryHeaderComponent, OnlyFirstName ]
})
export class LibraryModule { }
