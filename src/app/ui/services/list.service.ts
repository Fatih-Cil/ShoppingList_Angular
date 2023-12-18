import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { List } from '../models/list';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient,@Inject('BASE_API_URL') private baseUrl:string) { }


  getByUserId(id:number){
    return this.http.get<List[]>(`${this.baseUrl}/api/Lists?userId=${id}`);
  }

  add(list:List){

    return this.http.post<Response>(`${this.baseUrl}/api/Lists/`,list)

  }

  delete(id:number){
    return this.http.delete<Response>(`${this.baseUrl}/api/Lists/${id}`,{observe:'response'})
  } 

  updateListStatus(list:List){
    
    return this.http.put<Response>(`${this.baseUrl}/api/Lists/${list.id}`,list,{observe:'response'})
    
  }
  getList(id:number){
    return this.http.get<List>(`${this.baseUrl}/api/Lists/${id}`)
  } 

}
