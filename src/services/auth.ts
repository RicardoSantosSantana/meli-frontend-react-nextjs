 import { api } from '../services/api'

import { EndPoints } from '../config/api';


export async function signInRequest(data: any) {

  const user = new FormData();

  user.append("avatar_url", data.avatar_url);
  user.append("email", data.email);
  user.append("password", data.password);
  user.append("name", data.name);
  user.append("nickname", data.nickname);
  user.append("provider", data.provider);
  user.append("token", data.token);

 

  const registerUser = async (user: any) => {

    return await api.post(EndPoints.Register, user)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.group("REgister no auth.ts cath")
        console.log(error)
        console.groupEnd()
        return error;
      });
  };

  return await api.post(EndPoints.Login, user)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      
      console.group("erro no auth.ts cath")
      console.log(error)
      console.groupEnd()


      if (error.response.data.error == "user not found") {
        return registerUser(user);
      }

    });




}
