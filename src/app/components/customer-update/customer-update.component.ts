import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerAddDto } from 'src/app/models/customerAddDto';
import { CustomerDto } from 'src/app/models/customerDto';
import { Gender } from 'src/app/models/gender';
import { CustomerService } from 'src/app/services/customer.service';
import { GenderService } from 'src/app/services/gender.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  constructor(private customerService:CustomerService,private genderService:GenderService,
    private userService:UserService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
  customerUpdateForm:FormGroup;
  customerDto:CustomerDto;
  id:number;
  userId:number;
  genders:Gender[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getCustomerDtoById();
    this.getAllGender();
    })
  
    
  }
  createCustomerUpdateForm(){
    this.customerUpdateForm=this.formBuilder.group({
      id:[this.customerDto.id,Validators.required],
      identityNumber:[this.customerDto.identityNumber,Validators.required],
      email:[this.customerDto.email,Validators.required],
      firstName:[this.customerDto.firstName,Validators.required],
      lastName:[this.customerDto.lastName,Validators.required],
      phoneNumber:[this.customerDto.firstName,Validators.required],
      genderName:[this.customerDto.genderName,Validators.required],
    })
  }
  getAllGender(){
    this.genderService.getAll().subscribe(response=>{
      this.genders=response.data;
    })
  }
  getUserByName(userName:string){
   
  }
  getCustomerDtoById(){
    this.customerService.getCustomerDtoById(this.id).subscribe(response=>{
         this.customerDto=response.data;
         console.log(response.data)
         this.createCustomerUpdateForm();
    })
  }
  update(){
    if(this.customerUpdateForm.valid){ 
        let customerModel: CustomerAddDto = {
          id: this.customerDto.id,
          firstName: this.customerUpdateForm.get('firstName')?.value,
          lastName: this.customerUpdateForm.get('lastName')?.value,
          phoneNumber: this.customerUpdateForm.get('phoneNumber')?.value,
          genderId:Number(this.genders.find(x=>x.genderName==this.customerUpdateForm.get('genderName')?.value)?.id),
          email:this.customerUpdateForm.get('email')?.value,
          identityNumber:this.customerUpdateForm.get('identityNumber')?.value,
          password:"2222",
          
        };
        this.customerService.update(customerModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });  
    
        setTimeout(()=>{                          
          this.router.navigate(['customer/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
  
  }

  }
