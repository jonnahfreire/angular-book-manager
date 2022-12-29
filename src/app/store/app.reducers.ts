import { createReducer, on } from "@ngrx/store";
import { setAuthState, setBooks, setUsers } from "./app.actions";
import { AppState, AuthState } from "./models";

export const appInitialState: AppState = {
    users: [],
    books: []
}

export const authState: AuthState = { logged: false,  }

export const appReducer = createReducer(
    appInitialState,
    on(setUsers, (state, { payload }) => {
        state = {...state, users: payload};
        return state; 
    }),
    on(setBooks, (state, { payload }) => {
        state = {...state, books: payload};
        return state; 
    })
);

export const authReducer = createReducer(
    authState,
    on(setAuthState, (state, { payload }) => {
        state = {
            ...state, 
            user: payload.user, 
            books: payload.books,
            logged: payload.logged,
            authError: payload.authError,
            authSuccess: payload.authSuccess
        };
        return state; 
    })
);