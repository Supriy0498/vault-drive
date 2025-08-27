import { cookies } from "next/headers"

export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export const setCookies = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 15 * 60,
        sameSite: 'strict',
        secure: true
    })

    cookieStore.set('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
        sameSite: 'strict',
        secure: true
    })
}

export const clearCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, '', {path: '/', expires: new Date(0)});
    cookieStore.set(REFRESH_TOKEN_COOKIE, '', {path: '/', expires: new Date(0)});
}

export const setTestCookies = async () => {
    const cookieStore = await cookies();
      cookieStore.set('test_cookie','my_testy_cookie', {
          httpOnly: true,
          path: '/',
          maxAge: 15 * 60,
          sameSite: 'strict',
          secure: true
      })
}