import {  GithubAuthProvider } from 'firebase/auth';
import fireBaseLogIn from './LogIn';

const provider = new GithubAuthProvider(); 

const logIn = async() => fireBaseLogIn(provider)
 
const Github = { logIn };

export default Github;
