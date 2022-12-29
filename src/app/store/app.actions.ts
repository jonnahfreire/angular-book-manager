import { createAction, props } from "@ngrx/store";
import { AuthState, Book, User } from "./models";

export const loadUsers = createAction("[App] load users");
export const loadUsersSuccess = createAction("[App] [Success] load users success");

export const loadBooks = createAction("[App] load books");
export const loadBooksSuccess = createAction("[App] [Success] load books success");


export const setAuthState = createAction(
    "[Auth] set auth state", 
    props<{ payload: AuthState; }>(),
);

export const setUsers = createAction(
    "[App] set users", 
    props<{ payload: User[]; }>(),
);

export const setBooks = createAction(
    "[App] set books", 
    props<{ payload: Book[]; }>()
);