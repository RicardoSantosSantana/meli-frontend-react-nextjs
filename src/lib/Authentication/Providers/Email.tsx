import { EmailAuthProvider } from 'firebase/auth';
import fireBaseLogIn from './LogIn';
import { firebase } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { IEmail, IUser, returnAuthentication } from '../Interface'
import SessionCookie from '../SessionCookie';
import { signInRequest } from '../../../services/auth';
import Router, { useRouter } from 'next/router'
 
const provider = new EmailAuthProvider();

const thumbs = [
  '/thumb/alex-kidd-classsic.jpg',
  '/thumb/goku.jpeg',
  '/thumb/luffy.png',
  '/thumb/mario1.png',
  '/thumb/mario_smile.png',
  '/thumb/naruto.png',
  '/thumb/smile.jpg',
  '/thumb/sonic.jpg'
]


const logIn = async (formdata: IEmail) => {
 
  return await signInWithEmailAndPassword(firebase.auth, formdata.email, formdata.password)
    .then(async (userCredential) => {

      const nickname = formdata.email.split("@");

      const formatUser = {
        id_social: userCredential.user.uid,
        provider: "email",
        nickname: nickname[0],
        name: formdata.name,
        email: userCredential.user.email ?? formdata.email,
        password:formdata.password
      }
  
      console.log(formatUser);
   

      const user = await signInRequest(formatUser)

      console.group("signInRequest")
      console.log(user)
      console.groupEnd()
      
     

      SessionCookie.set(user.token.token);
      Router.push('/dashboard');

      const data: returnAuthentication = { success: "true", user, error: {} };
      return data;

    })
    .catch((error) => {

   
      const data:returnAuthentication = { success:"false", user:{}, error };
    
      SessionCookie.remove();
  
      return data;
    
    });

}

const registerUser = async (formdata: IEmail) => {

  return await createUserWithEmailAndPassword(firebase.auth, formdata.email, formdata.password)
    .then(async (userCredential) => {

      const nickname = formdata.email.split("@");

      const formatUser = {
        id_social: userCredential.user.uid,
        provider: "email",
        nickname: nickname[0],
        name: formdata.name,
        email: userCredential.user.email ?? formdata.email,
        password: formdata.password,
        token: "",
        avatar_url: thumbs[Math.floor(Math.random() * 8)]
      }

      const user = await signInRequest(formatUser)
      console.group("signInRequest")
      console.log(user)
      console.groupEnd()
      const data: returnAuthentication = { success: "true", user, error: {} };

      SessionCookie.set(user.token.token);
      Router.push('/dashboard');
      return data;


    })
    .catch((error) => {

      const data: returnAuthentication = { success: "false", user: {}, error };
      SessionCookie.remove();

      return data;
    });

}


const Email = { logIn, registerUser };


export default Email;
