import { getUserByEmail } from "@/lib/db/userRepository";
import { internalServerErrorResponse, INVALID_EMAIL_OR_PASSWORD } from "@/utils/responses";
import { UserRequest } from "@/types/api/auth";
import { User } from "@/types/db/user";
import { comparePassword } from "@/utils/hashPassword";
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from "@/lib/auth/auth";
import { setCookies } from "@/lib/auth/cookies";

export const POST = async (req: Request): Promise<Response> => {
    try {
        const {email, password} : UserRequest = await req.json();
        if(typeof email != 'string' || typeof password != 'string') {
            return Response.json({error: INVALID_EMAIL_OR_PASSWORD}, {status: 400})
        }

        //Checck in DB if user exists
        const user: User | null = await getUserByEmail(email);
        if(!user) {
            return Response.json({error: `No user with email "${email}" exists!`}, {status: 404});
        }

        //Check if pwd is valid/correct
        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return Response.json({error: 'Incorrect Password!'}, {status: 401});
        }

        //Create JWT
        const accessToken = generateAccessToken({userId: user.id});
        const refreshToken = generateRefreshToken({userId: user.id});
        await setCookies(accessToken, refreshToken);
        return Response.json({message: 'Login Successfull!'}, {status: 200});
        
    } catch (error) {
        console.error('login:POST err', error);
        return internalServerErrorResponse;
    }

}