import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { DbService } from '../services/database/database.service';
import { loadBooks, loadBooksSuccess, setBooks } from './app.actions';
import { selectBooks} from './app.selectors';
import { AppState } from './models';

@Injectable({
  providedIn: 'root'
})
export class BookEffectService {

  constructor(
    private actions$: Actions,
    private dbService: DbService,
    private store: Store<{ app: AppState }>
  ) { }

  loadBooks$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadBooks),
      withLatestFrom(this.store.select(selectBooks)),
      switchMap(([_, books]) => {

        if(!books?.length) {
          return this.dbService.getAllBooks().pipe(
            tap((books) => {
              this.store.dispatch(setBooks({ payload: books }))
            }),
            map(() => loadBooksSuccess())
          );
        }
        return of(loadBooksSuccess());
      }),
    )
  );
}
