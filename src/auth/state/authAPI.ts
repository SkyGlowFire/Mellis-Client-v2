import { IUser } from '~/types/user';
import { LoginUserDto, SignUpUserDto } from './dto/loginUser.dto';
import axios, { AxiosResponse } from 'axios';
const API_URI = process.env.REACT_APP_API_URI

const http = axios.create({
  baseURL: API_URI,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 15000,
  withCredentials: true
});

export async function fetchUser(): Promise<AxiosResponse> {
  return await http.get<IUser>('/auth/me')
}

export async function logOutAPI(): Promise<AxiosResponse> {
  return await http.get('/auth/logout')
}

export async function loginAPI(dto: LoginUserDto): Promise<AxiosResponse<{access_token: string}>> {
  return await http.post<{access_token: string}>('/auth/login-local', dto)
}

export async function registerAPI(dto: SignUpUserDto): Promise<AxiosResponse<{access_token: string}>> {
  return await http.post<{access_token: string}>('/users', dto)
}