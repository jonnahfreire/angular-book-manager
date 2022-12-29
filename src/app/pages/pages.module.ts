import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AlertsModule } from '../components/alerts/alerts.module';
import { BooksModule } from '../components/books/books.module';
import { LibraryFormsModule } from '../components/forms/forms.module';
import { LibraryModule } from '../components/library/library.module';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BooksModule, 
    LibraryModule,
    LibraryFormsModule,
    AlertsModule
  ],
  exports: [IndexComponent, HomeComponent]
})
export class PagesModule { }
