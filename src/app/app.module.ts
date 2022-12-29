import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { StoreModule } from '@ngrx/store';
import { appReducer, authReducer } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffectService } from './store/user.effect.service';
import { BookEffectService } from './store/book.effect.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    StoreModule.forRoot({ app: appReducer, auth: authReducer }),
    EffectsModule.forRoot([ 
      UserEffectService, 
      BookEffectService 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
