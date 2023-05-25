import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';
import { ResponseModel } from '../models/responseModel';
import { RegisterModel } from '../models/registerModel';
import { UserForUpdateDto } from '../models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  // getByEmail(email:string):Observable<SingleResponseModel<User>>{
  //   let newPath=this.apiUrl+"users/getbyemail?email="+email;
  //   return this.httpClient.get<SingleResponseModel<User>>(newPath);
  // }
  GetAllUserDto():Observable<ListResponseModel<UserDto>> {
    let newPath = this.apiUrl + "users/getalluserdto";
    return this.httpClient.get<ListResponseModel<UserDto>>(newPath);
  }
  getUserDtoById(id:number):Observable<SingleResponseModel<UserDto>>{
    let newPath=this.apiUrl+"users/getuserdtobyid?id="+id;
    return this.httpClient.get<SingleResponseModel<UserDto>>(newPath);
  }
  // GetByDate(date:Date):Observable<ListResponseModel<User>>{
  //   let newPath=this.apiUrl+"users/getbydate?date="+date;
  //   return this.httpClient.get<ListResponseModel<User>>(newPath);
  // }
  add(userForRegisterDto:RegisterModel):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"users/add",userForRegisterDto)
  }
  update(userForUpadeDto:UserForUpdateDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"users/update",userForUpadeDto)
  }
  delete(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"users/delete",user)
  }
  getUserDetailsByEmail(email:string):Observable<SingleResponseModel<UserDto>>{
    let newPath = this.apiUrl + "users/getuserdtobymail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserDto>>(newPath)
  }
}