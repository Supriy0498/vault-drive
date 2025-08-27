import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, setCookies } from "./cookies";
import { INVALID_OR_EXPIRED_TOKEN } from "@/utils/responses";
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "./auth";
import { redirect } from "next/navigation";
import { Handler } from "@/types/api/common";

export const withAuthMiddleware = (handler: Handler): Handler => {
    return async (req, context) => {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
        const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

        if(!refreshToken) {
            console.error('ERROR: No Refresh Token provided!');
            return Response.json({error: 'No Refresh Token provided!'}, {status: 401});
            // return redirect('/login');
        }
        
        let decodedPayload;
        try {
            decodedPayload = verifyAccessToken(accessToken);
        } catch (error) {
            console.error('ERROR: Expired or Invalid access token');
            try {
                decodedPayload = verifyRefreshToken(refreshToken);
                const accessToken = generateAccessToken({userId: decodedPayload.userId});
                await setCookies(accessToken, refreshToken);
            } catch (error) {
                console.error('ERROR: Expired refresh token');
                return Response.json({error: 'Expired refresh token provided!'}, {status: 401});
                // return redirect('/login');
            }
        }

        console.log('INFO: Success Auth Middleware');
        //forward userId to next request
        return handler(req, {...context, userId: decodedPayload.userId});
    }
}