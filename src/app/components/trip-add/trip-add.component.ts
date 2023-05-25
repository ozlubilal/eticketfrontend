import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BusType } from 'src/app/models/busType';
import { Route } from 'src/app/models/route';
import { RouteDto } from 'src/app/models/routeDto';
import { Trip } from 'src/app/models/trip';
import { BusTypeService } from 'src/app/services/bus-type.service';
import { RouteService } from 'src/app/services/route.service';
import { TownService } from 'src/app/services/town.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {
  tripAddForm:FormGroup;
  routeDtos:RouteDto[];
  busTypes:BusType[];
  constructor(private routeService:RouteService,private bustypeService:BusTypeService,private tripService:TripService,
    private formBuilder:FormBuilder,private toastrService:ToastrService,private townService:TownService,) { }

  ngOnInit(): void {
    this.createTripAddForm();
    this.getAllRouteDto();
    this.getAllBusTypes();
  }
  createTripAddForm(){
    this.tripAddForm=this.formBuilder.group({
      routeId:['',Validators.required],
      busTypeName:['',Validators.required],
      date:['',Validators.required],
      hour:['',Validators.required],
      price:['',Validators.required],
    })
  }
  getAllBusTypes(){
    this.bustypeService.getAll().subscribe(response=>{
      this.busTypes=response.data;
    })
  }
  getAllRouteDto(){
    this.routeService.getAllRouteDto().subscribe(response=>{
      this.routeDtos=response.data;
    })
  } 
  add(){
    
    if(this.tripAddForm.valid)
    {      
      let tripModel:Trip={
        id:undefined,
        routeId:this.tripAddForm.get('routeId')?.value,
        busTypeId:Number(this.busTypes.find(x=>x.busTypeName==this.tripAddForm.get('busTypeName')?.value)?.id),
        date:this.tripAddForm.get('date')?.value,
        hour:this.tripAddForm.get('hour')?.value,
        price:this.tripAddForm.get('price')?.value,
        stateId:1,
      }
        this.tripService.add(tripModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      })
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }
}


