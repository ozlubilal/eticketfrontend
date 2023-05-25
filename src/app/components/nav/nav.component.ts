import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserDto } from 'src/app/models/userDto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
userDetail:UserDto;
navigatePage="";
claimName="";
  constructor(private authService:AuthService,private localService:LocalService,private router:Router) { }

  ngOnInit(): void {
    this.isAuthenticated();
    if(this.isAuthenticated()){
    this.getUserDetail();
    }
  }
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  getUserDetail(){
    this.userDetail= JSON.parse(this.localService.getItem('user_details') || '')
    this.claimName=this.userDetail.claimName;
  }
  logOut(){
    this.localService.delete("token");
    this.localService.delete("user_details");
    this.router.navigate([this.navigatePage]).then(()=>{
      window.location.reload()});  
    }
  }


