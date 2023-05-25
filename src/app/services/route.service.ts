import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { RouteDto } from '../models/routeDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Route } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<Route>> {
    let newPath = this.apiUrl + "routes/getall"
    return this.httpClient.get<ListResponseModel<Route>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Route>>{
    let newPath=this.apiUrl+"routes/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Route>>(newPath);
  }
  getAllRouteDto():Observable<ListResponseModel<RouteDto>> {
    let newPath = this.apiUrl + "routes/getallroutedto"
    return this.httpClient.get<ListResponseModel<RouteDto>>(newPath);
  }
  GetByTownsId(startTownId:number,finishTownId:number){
    let newPath = this.apiUrl + "routes/getbytownsid=starttownid="+startTownId+"&finishtownid="+finishTownId;
    return this.httpClient.get<SingleResponseModel<Route>>(newPath);
  }
  add(route:Route):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"routes/add",route)
  }
  update(route:Route):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"routes/update",route)
  }
  delete(route:Route):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"routes/delete",route)
  }
}
