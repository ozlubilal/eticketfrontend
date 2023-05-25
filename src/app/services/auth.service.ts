import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient,
    private localService:LocalService,) { }
  register(userForRegisterDto:RegisterModel){
    let newPath=this.apiUrl+"auths/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,userForRegisterDto)
  }
  login(loginModel:LoginModel){
    let newPath=this.apiUrl+"auths/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
  isAuthenticated(){
    if(this.localService.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
