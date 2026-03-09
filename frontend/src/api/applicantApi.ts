import axios from "axios"
import type { LoginFormData } from "../types/loginTypes"

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withCredentials:true,
})

export const registerApi = async (data: FormData) => {
  const response = await api.post("/applicant/register", data,{
    headers : {
      "Content-Type":"multipart/form-data"
    }
  })
  return response.data
}

export const loginApi = async (data: LoginFormData) => {
  try{
    const response = await api.post("/applicant/login",data);
    if(response.status === 400){
      return { success:false }
    }
    return response.data;
  }catch (error: any) {
    if (error.response) {
      
      return {
        success: false,
        status: error.response.status,
        message: error.response.data?.message || "Login failed",
      };
    }

    
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}