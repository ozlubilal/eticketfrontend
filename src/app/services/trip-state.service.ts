import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TripState } from '../models/tripState';

@Injectable({
  providedIn: 'root'
})
export class TripStateService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<TripState>> {
    let newPath = this.apiUrl + "tripstates/getall";
    return this.httpClient.get<ListResponseModel<TripState>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<TripState>>{
    let newPath=this.apiUrl+"tripstates/getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<TripState>>(newPath);
  } 
  add(tripState:TripState):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"tripstates/add",tripState)
  }
  update(tripState:TripState):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tripstates/update",tripState)
  }
  delete(tripState:TripState):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tripstates/delete",tripState)
  }
}


