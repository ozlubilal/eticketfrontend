import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/OperationClaim';
import { Gender } from 'src/app/models/gender';
import { UserDto } from 'src/app/models/userDto';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { GenderService } from 'src/app/services/gender.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  constructor(private userService:UserService,private operationClaimService:OperationClaimService,
    private genderService:GenderService, private toastrService:ToastrService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
  userUpdateForm:FormGroup;
  userDto:UserDto;
  id:number;
  genders:Gender[];
  operationClaims:OperationClaim[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getUserById();
    this.getOperationClaims();
    })
  
    
  }
  createUserUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
      firstName:[this.userDto.firstName,Validators.required],
      lastName:[this.userDto.lastName,Validators.required],
      email:[this.userDto.email,Validators.required],
      operationClaimName:[this.userDto.claimName,Validators.required],
    })
  }
  getOperationClaims(){
    this.operationClaimService.getAll().subscribe(response=>{
      this.operationClaims=response.data;
    })
  }
  getGenders(){
    this.genderService.getAll().subscribe(response=>{
      this.genders=response.data;
    })
  }
  getUserById(){
    this.userService.getUserDtoById(this.id).subscribe(response=>{
         this.userDto=response.data;
         this.createUserUpdateForm();
    })
  }
  update(){
    if(this.userUpdateForm.valid){
      let userModel: UserForUpdateDto = {
        id: this.userDto.userId,
        firstName: this.userUpdateForm.get('firstName')?.value,
        lastName: this.userUpdateForm.get('lastName')?.value,
        email: this.userUpdateForm.get('email')?.value,
        operationClaimId:Number(this.operationClaims.find(x=>x.name==this.userUpdateForm.get('operationClaimName')?.value)?.id),
      };
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
         this.toastrService.error(responseError.error,"Başarısız")
        });     
        setTimeout(()=>{                          
          this.router.navigate(['user/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz');
    }
  }

}