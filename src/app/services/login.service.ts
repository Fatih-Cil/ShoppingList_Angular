import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,@Inject('BASE_API_URL') private baseUrl:string) { }


  auth(login: Login){
 
   return this.http.post(`${this.baseUrl}/api/auth`,login, {observe:'response',responseType: 'text'})
  }
    register(register:Register){
      return this.http.post<Response>(`${this.baseUrl}/api/users`,register, {observe:'response'})
    }
  

  }
