import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthResponse, AuthResponseWithError } from 'src/app/services/auth/AuthResponse';
import { setAuthState } from 'src/app/store/app.actions';
import { selectUserByEmail, selectUsers } from 'src/app/store/app.selectors';
import { AppState, AuthState, User } from 'src/app/store/models';

import { DbService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private users: User[] = [];
  private userSelectorSubscription!: Subscription;
  private loadUsersSubscription!: Subscription;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private db: DbService,
  ) {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.userSelectorSubscription.unsubscribe();
    this.loadUsersSubscription.unsubscribe();
  }

  signin(email: string, password: string): AuthResponseWithError {
    let user!: User;
    this.userSelectorSubscription = this.store.select(selectUserByEmail(email))
      .subscribe(_user => user = _user!);

    const response = {
      error: true,
      message: "Por favor preencha este campo!",
      fields: ["email", "password"] 
    };
    
    if(!email.length && !password.length){
      return response;
      
    } else if(!password.length && email.length) {
      response.fields.shift();

    } else if(!email.length && password.length) {
      response.fields.pop();

    } else {
      
      if(user === undefined) {
        response.message = "Usuário não encontrado!", 
        response.fields.pop();
        return response;

      } else if(user && user?.password !== password) {
        response.message = "Senha inválida!", 
        response.fields.shift();
      
      } else {
        return {
          error: false,
          fields: [],
          data: user
        }
      }
    }

    return response;
  }

  signup(user: User): Observable<AuthState> {
    if(this.users.find(_user => _user.email === user.email)) {
      this.store.dispatch(setAuthState({
        payload: {
          isCreatingUser: true,
          authError: {
            error: true,
            message: "Email já está sendo usado"
          }
        }
      }));

      return this.store.select("auth");
    }

    user.id = this.generateUserId();    
    this.db.createUser(user);

    this.store.dispatch(
      setAuthState({
        payload: {
          isCreatingUser: false,
          authSuccess: {
            success: true,
            message: "Usuário cadastrado com sucesso!"
          }
        }
      })
    );

    return this.store.select("auth");
  }

  private generateUserId(): number {
    return this.users.length + 1;
  }
  
  private loadUsers() {
    this.loadUsersSubscription = this.store.select(selectUsers)
      .subscribe(users => this.users = users!);
    
    if(this.users.length) {
      this.loadUsersSubscription.unsubscribe();
    } 
  }
}
