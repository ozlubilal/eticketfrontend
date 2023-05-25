import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<City>> {
    let newPath = this.apiUrl + "cities/getall"
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<City>>{
    let newPath=this.apiUrl+"cities/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<City>>(newPath);
  }
  add(city:City):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"cities/add",city)
  }
  update(city:City):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cities/update",city)
  }
  delete(city:City):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cities/delete",city)
  }
}
