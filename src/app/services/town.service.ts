import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Town } from '../models/town';
import { TownDto } from '../models/townDto';

@Injectable({
  providedIn: 'root'
})
export class TownService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<Town>> {
    let newPath = this.apiUrl + "towns/getall"
    return this.httpClient.get<ListResponseModel<Town>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Town>>{
    let newPath=this.apiUrl+"towns/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Town>>(newPath);
  }
  getByCityId(cityId:number):Observable<ListResponseModel<Town>>{
    let newPath=this.apiUrl+"towns/getbycityid?cityId="+cityId
    return this.httpClient.get<ListResponseModel<Town>>(newPath);
  }
  getAllTownDto():Observable<ListResponseModel<TownDto>> {
    let newPath = this.apiUrl + "towns/getalltowndto"
    return this.httpClient.get<ListResponseModel<TownDto>>(newPath);
  }
  getTownDtoByTownName():Observable<ListResponseModel<TownDto>> {
    let newPath = this.apiUrl + "towns/getalltowndto"
    return this.httpClient.get<ListResponseModel<TownDto>>(newPath);
  }
  add(town:Town):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"towns/add",town)
  }
  update(town:Town):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"towns/update",town)
  }
  delete(town:Town):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"towns/delete",town)
  }
}
