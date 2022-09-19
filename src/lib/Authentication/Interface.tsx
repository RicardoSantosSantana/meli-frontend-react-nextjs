import { ReactNode } from 'react';

export interface Props {
    children: ReactNode;
}
export interface IUser {
    id_social: string;
    provider: string;
    nickname:string;
    name: string;
    email: string;    
    token: string;    
    avatar_url: string;
}
export interface IEmail {
    name:string;
    email:string;
    password:string;
}
// Create context type
export type authContextType = {
    signInGoogle:() => void;
    signInGithub:() => void;
    signInEmail:(email: string, password: string)=>void;
    registerInEmail:(name:string, email: string, password: string)=>void;
    logOut:() => void;  
    user: IUser | null;
    error:object;
    loading:boolean;
    isOpenModal:boolean;
    setIsOpenModal:(valor:any)=>void;
    
};
export type returnAuthentication = {
    success:string;
    user:any;
    error:any
}

// Create context default values
export const authContextDefaultValues: authContextType = {
	signInGoogle: Function,
	signInGithub: Function,
    signInEmail:Function,
    registerInEmail:Function,
	logOut: Function,
	user: null,
	error: {},
	loading: false,
    isOpenModal:false,
    setIsOpenModal:Function,
    
};
