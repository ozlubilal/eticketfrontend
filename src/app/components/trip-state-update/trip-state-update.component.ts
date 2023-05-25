import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripState } from 'src/app/models/tripState';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-trip-state-update',
  templateUrl: './trip-state-update.component.html',
  styleUrls: ['./trip-state-update.component.css']
})
export class TripStateUpdateComponent implements OnInit {

  constructor(private tripStateService:TripStateService,private toastrService:ToastrService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
    tripStateUpdateForm:FormGroup;
  tripState:TripState;
  id:number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getTripStateById();
    
    })
  
    
  }
  createTripStateUpdateForm(){
    this.tripStateUpdateForm=this.formBuilder.group({
      id:[this.tripState.id,Validators.required],
      stateName:[this.tripState.stateName,Validators.required],
    })
  }
  getTripStateById(){
    this.tripStateService.getById(this.id).subscribe(response=>{
         this.tripState=response.data;
         this.createTripStateUpdateForm();
    })
  }
  update(){
    if(this.tripStateUpdateForm.valid){
      let tripStateModel=Object.assign({},this.tripStateUpdateForm.value);
      this.tripStateService.update(tripStateModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });     
        setTimeout(()=>{                          
          this.router.navigate(['tripstate/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
  }

}

