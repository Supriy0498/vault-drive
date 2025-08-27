import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "./cookies";
import { INVALID_OR_EXPIRED_TOKEN } from "@/utils/responses";
import { verifyAccessToken } from "./auth";

export const withAuthServerSidePropsWrapper = (func: Function)  => {
    return async (...args: any[]) => {
        try { 
            const cookieStore = await cookies();
            const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
            if(!accessToken) {
                return func(null);
            }

            const decodedAccessPayload = verifyAccessToken(accessToken) as {userId: string};
            //forward userId to next request

            return func({userId: decodedAccessPayload.userId});
        } catch (error) {
            return func(null);
        }
    }
}