export interface User {
    id: string,
    email: string,
    password: string,
    created_at: string
}

export type UserPublic = Pick<User, 'id' | 'email'>