import bcrypt from "bcryptjs"

const SALT = 10;

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT);
}

export const comparePassword = (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
}