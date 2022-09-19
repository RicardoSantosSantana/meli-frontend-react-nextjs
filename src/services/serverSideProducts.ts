import { logOut } from "./api";
import { getAPIClient } from './axios';
import { EndPoints } from '../config/api';

export default async function apiServerSideProducts(ctx:any){
  
  const apiClient = getAPIClient(ctx);
  const apiResponse = await apiClient.get(EndPoints.GetAllProducts)
   
  
  if (apiResponse.status != 200) {    
      return logOut(ctx)
  }

  return  apiResponse.data


}