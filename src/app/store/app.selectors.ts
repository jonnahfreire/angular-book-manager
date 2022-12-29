import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, AuthState } from "./models";

const selectApp = createFeatureSelector<AppState>("app");
const selectAuth = createFeatureSelector<AuthState>("auth");

export const selectUsers = createSelector(
    selectApp,
    state => state.users
);

export const selectBooks = createSelector(
    selectApp,
    state => state.books
);

export const selectUserByEmail = (email: string) => createSelector(
    selectUsers,
    users => users?.find(user => user.email === email)
);

export const selectBooksByUserId = (id: number) => createSelector(
    selectBooks,
    books => books?.filter(book => book.idowner === id)
);  
    
export const selectAuthState = createSelector(selectAuth, state => state);

export const selectAuthenticatedUser = createSelector(
    selectAuth,
    state => state.user
);

export const selectAuthenticatedUserBooks = createSelector(
    selectAuth,
    state => state.books
);