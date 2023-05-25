import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Ticket } from '../models/ticket';
import { TicketDto } from '../models/ticketDto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<Ticket>> {
    let newPath = this.apiUrl + "tickets/getall"
    return this.httpClient.get<ListResponseModel<Ticket>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Ticket>>{
    let newPath=this.apiUrl+"tickets/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Ticket>>(newPath);
  }
   getByTripId(tripId:number):Observable<ListResponseModel<Ticket>>{
    let newPath=this.apiUrl+"tickets/getbytripid?tripid="+tripId
    return this.httpClient.get<ListResponseModel<Ticket>>(newPath);
  }
  getByCustomerId(customerId:number):Observable<ListResponseModel<Ticket>>{
    let newPath=this.apiUrl+"tickets/getbycustomerid?customerid="+customerId
    return this.httpClient.get<ListResponseModel<Ticket>>(newPath);
  }
  getByIdentityNumber(identityNumber:number):Observable<ListResponseModel<Ticket>>{
    let newPath=this.apiUrl+"tickets/getbyid?identitynumber="+identityNumber
    return this.httpClient.get<ListResponseModel<Ticket>>(newPath);
  }
   getAllTicketDto():Observable<ListResponseModel<TicketDto>> {
    let newPath = this.apiUrl + "tickets/getallticketdto  "
    return this.httpClient.get<ListResponseModel<TicketDto>>(newPath);
  }
  getSeatNumberOfTripList(tripId:number):Observable<ListResponseModel<number>>{
    let newPath = this.apiUrl + "tickets/getseatnumberoftriplist?tripId="+tripId;
    return this.httpClient.get<ListResponseModel<number>>(newPath);
  }
  add(ticket:Ticket):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"tickets/add",ticket)
  }
  update(ticket:Ticket):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tickets/update",ticket)
  }
  delete(ticket:Ticket):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tickets/delete",ticket)
  }
}
