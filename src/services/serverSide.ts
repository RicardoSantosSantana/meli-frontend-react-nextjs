import jwt from 'jsonwebtoken';
import { parseCookies } from "nookies";
import { logOut } from "./api";
import { getAPIClient } from './axios';
import { EndPoints } from '../config/api';

export default async function apiServerSide(ctx: any) {

  const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH ?? ""

  const token = parseCookies(ctx)[cookieName]

  const jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET ?? ""

  if (!token) {
    return logOut(ctx)
  }

  const user_id = jwt.verify(token, jwt_secret, function (err, code): any {

    if (err) {
      return logOut(ctx)
    }

    return code?.sub;

  });

  const apiClient = getAPIClient(ctx);
  const apiResponse = await apiClient.get(`${EndPoints.GetProfile}/${user_id}`)

  if (apiResponse.status != 200) {
    return logOut(ctx)
  }

  return apiResponse.data;


}