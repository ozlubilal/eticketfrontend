import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { BusType } from '../models/busType';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class BusTypeService {
  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<BusType>> {
    let newPath = this.apiUrl + "busTypes/getall"
    return this.httpClient.get<ListResponseModel<BusType>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<BusType>>{
    let newPath=this.apiUrl+"busTypes/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<BusType>>(newPath);
  }
  add(busType:BusType):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"bustypes/add",busType)
  }
  update(busType:BusType):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"bustypes/update",busType)
  }
  delete(busType:BusType):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"bustypes/delete",busType)
  }
}
