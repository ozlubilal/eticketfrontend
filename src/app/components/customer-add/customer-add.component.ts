import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { CustomerAddDto } from 'src/app/models/customerAddDto';
import { Gender } from 'src/app/models/gender';
import { CustomerService } from 'src/app/services/customer.service';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customerAddForm:FormGroup;
  genders:Gender[];
  constructor(private genderService:GenderService,private customerService:CustomerService,private formBuilder:FormBuilder,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createCustomerAddForm();
    this.getGenders();
    
  }
  createCustomerAddForm(){
    this.customerAddForm=this.formBuilder.group({
      identityNumber:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      phoneNumber:['',Validators.required],
      password:['',Validators.required],
      genderName:['',Validators.required],
    });
  }
  getGenders(){
    this.genderService.getAll().subscribe(response=>{
      this.genders=response.data;
      console.log(response.data)
    })
  }
  add(){
    if(this.customerAddForm.valid)
    {
    
      let customerAddDtoModel: CustomerAddDto = {
        id: 1,        
        identityNumber:this.customerAddForm.get('identityNumber')?.value,
        firstName:this.customerAddForm.get('firstName')?.value,
        lastName:this.customerAddForm.get('lastName')?.value,
        phoneNumber:this.customerAddForm.get('phoneNumber')?.value,
        email: this.customerAddForm.get('email')?.value,
        password: this.customerAddForm.get('password')?.value,
        genderId:Number(this.genders.find(x=>x.genderName==this.customerAddForm.get('genderName')?.value)?.id),

      };
      this.customerService.add(customerAddDtoModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      }, responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      });
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }
}