import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { Town } from 'src/app/models/town';
import { TripDto } from 'src/app/models/tripDto';
import { BusTypeService } from 'src/app/services/bus-type.service';
import { CityService } from 'src/app/services/city.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TownService } from 'src/app/services/town.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
})
export class CustomerHomeComponent implements OnInit {
  price: number | null=null;
  busTypeId: number;
  bookedSeats: number[] = [];
  tripId: number;
  tripDto:TripDto;


  cities: City[];
  startTowns: Town[];
  finishTowns: Town[];
  selectRouteForm: FormGroup;
  startCityId = null;
  finishCityId = null;
  tripDtos: TripDto[] | null=null;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private townService: TownService,
    private tripService: TripService,
    private bustypeService:BusTypeService,
    private ticketService:TicketService,
  ) {}

  ngOnInit(): void {
    this.createSelectRouteForm();
    this.getCities();
  }
  returnToHome(){
    this.tripDtos=null;
    this.price=null;
  }
  returnSelectTrip(){
    this.price=null;
  }
  createSelectRouteForm() {
    this.selectRouteForm = this.formBuilder.group({
      startCity: ['', Validators.required],
      startTown: ['', Validators.required],
      finishCity: ['', Validators.required],
      finishTown: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  getCities() {
    this.cityService.getAll().subscribe((response) => {
      this.cities = response.data;
    });
  }

  getStartTownsByCity(startCityId: number) {
    if (startCityId) {
      this.townService.getByCityId(startCityId).subscribe((response) => {
        this.startTowns = response.data;
      });
    }
  }
  getFinishTownsByCity(finishCityId: number) {
    if (finishCityId) {
      this.townService.getByCityId(finishCityId).subscribe((response) => {
        this.finishTowns = response.data;
      });
    }
  }
  getTrips() {
    let startTownId = this.selectRouteForm.get('startTown')?.value;
    let finishTownId = this.selectRouteForm.get('finishTown')?.value;
    let date = this.selectRouteForm.get('date')?.value;
    this.tripService
      .GetByStartTownIdAndFinishTownId(startTownId, finishTownId, date)
      .subscribe((response) => {
        this.tripDtos = response.data;
      });
  }

  getBusTypeId(tripId:number){
    this.tripService.getById(tripId).subscribe(response=>{
      this.busTypeId=response.data.busTypeId;
    })
  }
  selectTrip(tripDto:TripDto){
    // Seçilen sefere ait dolu koltuk numaraları getiriliyor
     this.ticketService.getSeatNumberOfTripList(tripDto.id).subscribe(response=>{
     this.bookedSeats=response.data 
       this.getPrice(tripDto.id);
       this.tripId=tripDto.id;
       this.busTypeId=tripDto.busTypeId;
       this.tripDto=tripDto; 
     })
     
     
   }
   getPrice(tripId:number){
     this.tripService.getById(tripId).subscribe(response=>{
       this.price=response.data.price;
     })
   }
}
