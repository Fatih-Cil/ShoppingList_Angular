import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class DashboardService{

  
  


  constructor(private http:HttpClient,@Inject('BASE_API_URL') private baseUrl:string) { }


  getCategory(){

  return this.http.get<Category[]>(`${this.baseUrl}/api/Categories`);
       
  }

  getProduct(){

    return this.http.get<Category[]>(`${this.baseUrl}/api/Products`);
         
    }
    getUser(){

      return this.http.get<Category[]>(`${this.baseUrl}/api/Users`);
           
      }

}
