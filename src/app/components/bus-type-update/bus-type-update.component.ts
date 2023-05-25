import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusType } from 'src/app/models/busType';
import { BusTypeService } from 'src/app/services/bus-type.service';

@Component({
  selector: 'app-bus-type-update',
  templateUrl: './bus-type-update.component.html',
  styleUrls: ['./bus-type-update.component.css']
})
export class BusTypeUpdateComponent implements OnInit {

  constructor(private busTypeService:BusTypeService,private toastrService:ToastrService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
   busTypeUpdateForm:FormGroup;
  busType:BusType;
  id:number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getBusTypeById();
    
    })
  
    
  }
  createBusTypeUpdateForm(){
    this.busTypeUpdateForm=this.formBuilder.group({
      id:[this.busType.id,Validators.required],
      busTypeName:[this.busType.busTypeName,Validators.required],
      numberOfSeats:[this.busType.numberOfSeats,Validators.required],
    })
  }
  getBusTypeById(){
    this.busTypeService.getById(this.id).subscribe(response=>{
         this.busType=response.data;
         this.createBusTypeUpdateForm();
    })
  }
  update(){
    if(this.busTypeUpdateForm.valid){
      let busTypeModel=Object.assign({},this.busTypeUpdateForm.value);
      this.busTypeService.update(busTypeModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarıssız");
        });     
        setTimeout(()=>{                          
          this.router.navigate(['bustypes/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
  }

}
