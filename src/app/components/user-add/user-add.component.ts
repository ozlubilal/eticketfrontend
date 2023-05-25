import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/OperationClaim';
import { Gender } from 'src/app/models/gender';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { GenderService } from 'src/app/services/gender.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userAddForm:FormGroup;
  operationClaims:OperationClaim[];
  genders:Gender[];
  constructor(private operationClaimService:OperationClaimService,private genderService:GenderService,
    private userService:UserService,private authService:AuthService,private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createUserAddForm();
    this.getOperationClaims();
    this.getGenders();
    
  }
  createUserAddForm(){
    this.userAddForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      operationClaimName:['',Validators.required],
    });
  }
  getOperationClaims(){
    this.operationClaimService.getAll().subscribe(response=>{
      this.operationClaims=response.data;
      this.operationClaims.splice(this.operationClaims.findIndex(o => o.name === "customer"),1)
     
    })
  }
  getGenders(){
    this.genderService.getAll().subscribe(response=>{
      this.genders=response.data;
    })
  }
  add(){
    if(this.userAddForm.valid)
    {      
      let userModel: RegisterModel = {
        firstName:this.userAddForm.get('firstName')?.value,
        lastName:this.userAddForm.get('lastName')?.value,
        email: this.userAddForm.get('email')?.value,
        password: this.userAddForm.get('password')?.value,
        operationClaimId:Number(this.operationClaims.find(x=>x.name==this.userAddForm.get('operationClaimName')?.value)?.id),
      };
    this.authService.register(userModel).subscribe(response=>{
      this.toastrService.success(response.message);
    },
    responseError=>{
      this.toastrService.error(responseError.error.message,"Başarısız");
    })
    }
    else{      
        this.toastrService.error("Formu eksiksiz doldurunuz");
    }
  }
}