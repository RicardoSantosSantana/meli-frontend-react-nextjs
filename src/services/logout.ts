import { destroyCookie } from 'nookies';

export default function Logout(ctx?: any) {

    destroyCookie(ctx, process.env.NEXT_PUBLIC_COOKIE_API_AUTH);

    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
}