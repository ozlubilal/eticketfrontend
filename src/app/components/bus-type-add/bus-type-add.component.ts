import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BusType } from 'src/app/models/busType';
import { BusTypeService } from 'src/app/services/bus-type.service';

@Component({
  selector: 'app-bus-type-add',
  templateUrl: './bus-type-add.component.html',
  styleUrls: ['./bus-type-add.component.css']
})
export class BusTypeAddComponent implements OnInit {
  busTypeAddForm:FormGroup;
  constructor(private busTypeService:BusTypeService,private formBuilder:FormBuilder,private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createBusTypeForm();
    
  }
  createBusTypeForm(){
    this.busTypeAddForm=this.formBuilder.group({
      busTypeName:['',Validators.required],
      numberOfSeats:['',Validators.required],
    });
  }
  add(){
    if(this.busTypeAddForm.valid){
      let busTypeModel=Object.assign({},this.busTypeAddForm.value);
      this.busTypeService.add(busTypeModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        console.log(response.message);
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz.","Başarısız");
    }
     
    
   
     
  }
}
