import { GoogleAuthProvider } from 'firebase/auth';
import fireBaseLogIn from './LogIn';

const provider = new GoogleAuthProvider();
 
const logIn = async() => fireBaseLogIn(provider) 

const Google = { logIn };
export default Google;
