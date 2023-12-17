import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AddProduct } from '../models/add-product';
import { Product } from '../models/product';
import { filter, from, map, mergeMap, toArray } from 'rxjs';

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
 
    delete(id:number){
      return this.http.delete<Response>(`${this.baseUrl}/api/products/${id}`,{observe:'response'})
    } 
  
    update(product:Product){
      return this.http.put<Response>(`${this.baseUrl}/api/products/${product.id}`,product,{observe:'response'})
    }

    getUserWithSearch(searchText:string){

      
      
      return this.http.get<Product[]>(`${this.baseUrl}/api/products`)
      .pipe(mergeMap(x=>from(x)),filter(x=>x.name.toLowerCase().includes(searchText.toLowerCase())),toArray());
    }


}
