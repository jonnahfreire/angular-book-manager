import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { setAuthState } from 'src/app/store/app.actions';
import { selectAuthenticatedUser } from 'src/app/store/app.selectors';
import { AuthState } from 'src/app/store/models';

@Component({
  selector: 'app-library-header',
  templateUrl: './library-header.component.html',
  styleUrls: ['./library-header.component.css']
})
export class LibraryHeaderComponent implements OnInit {
  username: string = "";

  constructor(private store: Store<{ auth: AuthState }>) { }

  ngOnInit(): void {
    this.store.select(selectAuthenticatedUser)
      .pipe(
        tap(user => this.username = user?.name!)
    ).subscribe();
  }

  handleExit() {
    this.store.dispatch(setAuthState({
      payload: {
        user: undefined,
        logged: false,
        books: []
      }
    }));
  }
}
