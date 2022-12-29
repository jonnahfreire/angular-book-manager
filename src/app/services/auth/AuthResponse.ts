import { User } from "src/app/store/models";

export interface AuthResponse {
    error: boolean,
    message?: string,
    data?: User
}

export interface AuthResponseWithError extends AuthResponse {
    fields: string[]
}