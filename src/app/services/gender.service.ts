import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Gender } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<Gender>> {
    let newPath = this.apiUrl + "genders/getall"
    return this.httpClient.get<ListResponseModel<Gender>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Gender>>{
    let newPath=this.apiUrl+"genders/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Gender>>(newPath);
  }
  add(gender:Gender):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"genders/add",gender)
  }
  update(gender:Gender):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"genders/update",gender)
  }
  delete(gender:Gender):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"genders/delete",gender)
  }
}
