import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private readonly TOKEN_KEY = 'authToken';
  constructor(private http:HttpClient,@Inject('BASE_API_URL') private baseUrl:string) { }
  

  auth(login: Login){
 
   return this.http.post(`${this.baseUrl}/api/auth`,login, {observe:'response',responseType: 'text'})
  }
    register(register:Register){
      return this.http.post<Response>(`${this.baseUrl}/api/users`,register, {observe:'response'})
    }
  
    getTokenRole():string{
      const helper = new JwtHelperService();
      const token=sessionStorage.getItem(this.TOKEN_KEY)


      const decodedToken =helper.decodeToken(token as string);
      return (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

    }
    getTokenUserId():string{
      const helper = new JwtHelperService();
      const token=sessionStorage.getItem(this.TOKEN_KEY)


      const decodedToken =helper.decodeToken(token as string);
      return (decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]);

    }

    logout(): void {
      
      sessionStorage.removeItem(this.TOKEN_KEY);
    }




  }
