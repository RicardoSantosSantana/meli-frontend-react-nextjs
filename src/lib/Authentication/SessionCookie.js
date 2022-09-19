import cookie from 'js-cookie';
import { destroyCookie } from 'nookies';

const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH;

const SessionCookie = {
  set(token) {
    cookie.set(cookieName, token, { expires: 1 });
  },
  remove() {
    cookie.remove(cookieName);
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH
 
    destroyCookie(null, cookieName);
  },
};
export default SessionCookie;
