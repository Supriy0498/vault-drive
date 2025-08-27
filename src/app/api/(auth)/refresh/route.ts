import { generateAccessToken, verifyRefreshToken } from "@/lib/auth/auth";
import { REFRESH_TOKEN_COOKIE, setCookies } from "@/lib/auth/cookies";
import { INVALID_OR_EXPIRED_TOKEN } from "@/utils/responses";
import { cookies } from "next/headers"

export const POST = async (req: Request) => {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
        if(!refreshToken) {
            return Response.json({error: 'No refresh token provided!'}, {status: 401});
        }
        const decodedRefreshPayload = verifyRefreshToken(refreshToken) as {userId: string};
        const accessToken = generateAccessToken({userId: decodedRefreshPayload.userId});
        // await setCookies(accessToken, refreshToken);
        return Response.json({message: 'Access Token refreshed successfully!', accessToken, refreshToken}, {status: 200});
    } catch (error) {
        console.error('refresh:POST err', error);
        return Response.json({error: INVALID_OR_EXPIRED_TOKEN}, {status: 401});
    }
}