import { getAPIClient } from "./axios";
import { destroyCookie } from 'nookies';

export const api = getAPIClient()

export const logOut = (ctx?: any) => {

    const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH ?? ""

    destroyCookie(ctx, cookieName);

    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
}