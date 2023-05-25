import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-trip-state-add',
  templateUrl: './trip-state-add.component.html',
  styleUrls: ['./trip-state-add.component.css']
})
export class TripStateAddComponent implements OnInit {
  tripStateAddForm:FormGroup;
  constructor(private tripStateService:TripStateService,private formBuilder:FormBuilder,private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createTripStateAddForm();
  }
  createTripStateAddForm(){
    this.tripStateAddForm=this.formBuilder.group({
      stateName:['',Validators.required],
    });
  }
  add(){
    if(this.tripStateAddForm.valid)
    {
      console.log("ok");
      let tripstateModel=Object.assign({},this.tripStateAddForm.value);
      this.tripStateService.add(tripstateModel).subscribe(response=>{
        this.toastrService.warning("response.message","Başarılı");
      },
      responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      });
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }

}
