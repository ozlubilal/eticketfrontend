import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Trip } from '../models/trip';
import { TripDto } from '../models/tripDto';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Trip>> {
    let newPath = this.apiUrl + "trips/getall";
    return this.httpClient.get<ListResponseModel<Trip>>(newPath);
  }
  getAllTripDto():Observable<ListResponseModel<TripDto>> {
    let newPath = this.apiUrl + "trips/getalltripdto";
    return this.httpClient.get<ListResponseModel<TripDto>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Trip>>{
    let newPath=this.apiUrl+"trips/getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<Trip>>(newPath);
  }
  getByRouteId(routeId:number):Observable<ListResponseModel<Trip>> {
    let newPath = this.apiUrl + "trips/getbyrouteid="+routeId;
    return this.httpClient.get<ListResponseModel<Trip>>(newPath);
  }
  GetByStartTownIdAndFinishTownId(startTownId:number,finishTownId:number,date:Date):Observable<ListResponseModel<TripDto>> {
    let newPath = this.apiUrl + "trips/getbystarttownidandfinishtownid?starttownid="+
    startTownId+"&finishtownid="+finishTownId+"&date="+date;
    return this.httpClient.get<ListResponseModel<TripDto>>(newPath);
  }
  GetByDate(date:Date):Observable<ListResponseModel<Trip>>{
    let newPath=this.apiUrl+"trips/getbydate?date="+date;
    return this.httpClient.get<ListResponseModel<Trip>>(newPath);
  }
  add(trip:Trip):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"trips/add",trip)
  }
  update(trip:Trip):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"trips/update",trip)
  }
  delete(trip:Trip):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"trips/delete",trip)
  }
}
