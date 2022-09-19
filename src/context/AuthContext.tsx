import Router, { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react';
import { Props, authContextType, authContextDefaultValues, IEmail } from '../lib/Authentication/Interface';
import Authentication from '../lib/Authentication/Authentication';
import { parseCookies, destroyCookie } from 'nookies'

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function AuthProvider({ children }: Props) {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);


  const [isOpenModal, setOpenModal] = useState<boolean>(false)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH;
  const token = parseCookies()[cookieName]

  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET

  const setIsOpenModal = (value:boolean) => {
    setOpenModal(value)
  }

  const signInGoogle = async () => {
    setLoading(true);
    const data = await Authentication.Google.logIn();
    await setUser(data.user);
    setError(data.error);
    setLoading(false);
  };

  const signInGithub = async () => {
    setLoading(true);
    const data = await Authentication.GitHub.logIn();
    await setUser(data.user);
    setError(data.error);
    setLoading(false);
  };

  const signInEmail = async (email: string, password: string) => {

    const name = "";
    const formData: IEmail = { name, email, password }
    setLoading(true);
    const data = await Authentication.Email.logIn(formData);
    await setUser(data.user);
    setError(data.error);
    setLoading(false);

  };

  const registerInEmail = async (name: string, email: string, password: string) => {

    const formData: IEmail = { name, email, password }
    setLoading(true);
    const data = await Authentication.Email.registerUser(formData)
    await setUser(data.user);
    setError(data.error);
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);
    const data = await Authentication.logOut();
    await setUser(data.user);
    destroyCookie(undefined, process.env.NEXT_PUBLIC_COOKIE_API_AUTH)
    setError(data.error);
    Router.push('/');
    setLoading(false);
  };

  const value: authContextType = {
    signInGoogle, signInGithub, signInEmail, registerInEmail, logOut, user, error, loading, isOpenModal, setIsOpenModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
