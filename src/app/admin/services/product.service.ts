import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AddProduct } from '../models/add-product';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,@Inject('BASE_API_URL') private baseUrl:string) { }


  add(addproduct:AddProduct){

    return this.http.post<Response>(`${this.baseUrl}/api/Products/`,addproduct)

  }

  
    getAll(){
      return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
    }
 


}
