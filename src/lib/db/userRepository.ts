import { User, UserPublic } from "@/types/db/user";
import db from "./config"

export const getUserByEmail = async (email: string) : Promise<User | null > => {
    const res = await db.query('SELECT * FROM USERS WHERE email = $1', [email]);
    return res.rows.length > 0 ? res.rows[0] as User : null;
}

export const getUserById = async (userId: string): Promise<UserPublic | null> => {
    const res = await db.query('SELECT id,email FROM USERS WHERE id = $1', [userId]);
    const user = res.rows.length > 0 ? res.rows[0] as User : null;
    if(user) {
        return {
            id: user.id,
            email: user.email
        }
    }
    return user;
}

export const createUser = async (email: string, password: string) => {
    return await db.query('INSERT INTO users(email, password) VALUES($1, $2)', [email, password]);
}