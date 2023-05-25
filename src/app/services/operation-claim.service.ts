import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/OperationClaim';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + "operationClaims/getall"
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
  getByOperationClaimName(operationClaimName:string):Observable<SingleResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + "operationClaims/getbyoperationclaimname?operationclaimname"+operationClaimName;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<OperationClaim>>{
    let newPath=this.apiUrl+"operationClaims/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }
  add(operationClaim:OperationClaim):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/add",operationClaim)
  }
  update(operationClaim:OperationClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/update",operationClaim)
  }
  delete(operationClaim:OperationClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/delete",operationClaim)
  }
}