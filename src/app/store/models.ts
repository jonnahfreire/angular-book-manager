export interface AppState {
    users?: User[],
    books?: Book[]
}

export interface AuthState {
    logged?: boolean,
    user?: User,
    books?: Book[],
    isCreatingUser?: boolean, 
    authError?: {
        error: boolean,
        message: string
    },
    authSuccess?: {
        success: boolean,
        message: string
    }
}

export interface Book {
    id: number,
    title: string,
    author: string,
    pages: number,
    tag: string,
    idowner: number
}

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
}