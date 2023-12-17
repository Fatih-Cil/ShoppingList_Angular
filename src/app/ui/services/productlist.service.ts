import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Addproducttolist } from '../models/addproducttolist';
import { Productlist } from '../models/productlist';
import { Updateproductlist } from '../models/updateproductlist';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  private dataStringSource = new BehaviorSubject<string>('');
  currentDataString = this.dataStringSource.asObservable();

  private dataIdSource = new BehaviorSubject<number>(0);
  currentDataId = this.dataIdSource.asObservable();

  

  constructor(private http:HttpClient,@Inject('BASE_API_URL') private baseUrl:string) { }

  add(productList:Addproducttolist){

    return this.http.post<Response>(`${this.baseUrl}/api/productlists/`,productList);

  }

  getAll(id:number){

    return this.http.get<Productlist[]>(`${this.baseUrl}/api/ProductLists/ProductListDetail/${id}`);
  }

  delete(id:number){
    return this.http.delete<Response>(`${this.baseUrl}/api/ProductLists/${id}`,{observe:'response'})
  } 

  update(updateproductlist:Updateproductlist){

    return this.http.put<Response>(`${this.baseUrl}/api/productlists/${updateproductlist.id}`,updateproductlist);

  }


  setData(dataString: string, dataId: number) {
    this.dataStringSource.next(dataString);
    this.dataIdSource.next(dataId);
    
  }


}
