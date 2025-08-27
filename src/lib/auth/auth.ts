import jwt from "jsonwebtoken"

interface UserPaylod {
    userId: string
}

export const generateAccessToken = (payload: UserPaylod) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_PRIVATE_KEY, {expiresIn: '15m'});
}

export const generateRefreshToken = (payload: UserPaylod) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_PRIVATE_KEY, {expiresIn: '7d'});
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_PRIVATE_KEY);
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_PRIVATE_KEY);
}