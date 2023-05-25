import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusType } from 'src/app/models/busType';
import { RouteDto } from 'src/app/models/routeDto';
import { Trip } from 'src/app/models/trip';
import { BusTypeService } from 'src/app/services/bus-type.service';
import { RouteService } from 'src/app/services/route.service';
import { TownService } from 'src/app/services/town.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.css']
})
export class TripUpdateComponent implements OnInit {
  constructor(
    private bustypeService:BusTypeService,
    private tripService:TripService,
    private routeService: RouteService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private townService: TownService
  ) {}
  tripUpdateForm: FormGroup;
  routeDtos: RouteDto[];
  busTypes: BusType[];
  trip:Trip;
  id: number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getTripById();
      this.getAllBusTypes();
      this.getAllRouteDto();
    });
  }
  createTripUpdateForm() {
    this.tripUpdateForm = this.formBuilder.group({
      routeId:['',Validators.required],
      busTypeName:['',Validators.required],
      date:['',Validators.required],
      hour:['',Validators.required],
      price:['',Validators.required],
    });
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
  getTripById() {
    this.tripService.getById(this.id).subscribe((response) => {
       this.trip=response.data;
      this.createTripUpdateForm();
    });
  }
  update() {
    let tripModel:Trip={
      id:this.trip.id,
      routeId:this.tripUpdateForm.get('routeId')?.value,
      busTypeId:Number(this.busTypes.find(x=>x.busTypeName==this.tripUpdateForm.get('busTypeName')?.value)?.id),
      date:this.tripUpdateForm.get('date')?.value,
      hour:this.tripUpdateForm.get('hour')?.value,
      price:this.tripUpdateForm.get('price')?.value,
      stateId:1,
    }
    if (this.tripUpdateForm.valid) {
      this.tripService.update(tripModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      setTimeout(() => {
        this.router.navigate(['trip/list']);
      }, 5000);
    } else {
      this.toastrService.error('Formu eksiksiz giriniz', 'Başarısız');
    }
   }
}



