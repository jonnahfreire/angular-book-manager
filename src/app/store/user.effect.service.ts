import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { DbService } from '../services/database/database.service';
import { loadUsers, loadUsersSuccess, setUsers } from './app.actions';
import { selectUsers } from './app.selectors';
import { AppState } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserEffectService {

  constructor(
    private actions$: Actions,
    private dbService: DbService,
    private store: Store<{ app: AppState }>
  ) { }

  loadUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectUsers)),
      switchMap(([_, users]) => {

        if(!users?.length) {
          return this.dbService.getAllUsers().pipe(
            tap((users) => {
              this.store.dispatch(setUsers({ payload: users }))
            }),
            map(() => loadUsersSuccess())
          );
        }
        return of(loadUsersSuccess());
      }),
    )
  );
}
