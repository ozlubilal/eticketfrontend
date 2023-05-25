import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerAddDto } from '../models/customerAddDto';
import { CustomerDto } from '../models/customerDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  getByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyid?userid="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  getByIdentityNumber(identityNumber:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyid?identitynumber="+identityNumber
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  getByPhoneNumber(phoneNumber:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyid?phonenumber="+phoneNumber
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  getAllCustomerDto():Observable<ListResponseModel<CustomerDto>> {
    let newPath = this.apiUrl + "customers/getallcustomerdto"
    return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }
  getCustomerDtoById(id:number):Observable<SingleResponseModel<CustomerDto>>{
    let newPath=this.apiUrl+"customers/getcustomerdtobyid?id="+id
    return this.httpClient.get<SingleResponseModel<CustomerDto>>(newPath);
  }
  add(customerAddDto:CustomerAddDto):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"customers/add",customerAddDto)
  }
  update(customerAddDto:CustomerAddDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"customers/update",customerAddDto)
  }
  delete(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"customers/delete",customer)
  }
}
