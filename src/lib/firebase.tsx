import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import firebaseConfig from './firebase.config'
import { IUser } from './Authentication/Interface'
 

const app = initializeApp(firebaseConfig)
const auth = getAuth()

const formatUser = (result:any): IUser => ({
    id_social: result.user.uid,
    provider: result.providerId,
    nickname: result.user.nickname,
    name: result.user.displayName,
    email: result.user.email,
    token: result.user.accessToken,  
    avatar_url: result.user.photoURL
  })

      


export const firebase = { app, auth, formatUser }
