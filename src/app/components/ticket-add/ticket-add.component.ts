import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BusType } from 'src/app/models/busType';
import { RouteDto } from 'src/app/models/routeDto';
import { TripDto } from 'src/app/models/tripDto';
import { BusTypeService } from 'src/app/services/bus-type.service';
import { RouteService } from 'src/app/services/route.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {
  
  price:number | null; 
  busTypeId:number;
  bookedSeats:number[]=[];
  tripDto:TripDto;

  ticketAddForm:FormGroup;
  routeDtos:RouteDto[];
  busTypes:BusType[];
  tripDtos:TripDto[] | null;
  
  

  constructor(private routeService:RouteService,private bustypeService:BusTypeService,
    private tripService:TripService,private ticketService:TicketService,
    private formBuilder:FormBuilder,private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createTicketAddForm();
    this.getAllRouteDto();
    this.getAllBusTypes();
  }
  createTicketAddForm(){
    this.ticketAddForm=this.formBuilder.group({
      routeId:['',Validators.required],
      date:['',Validators.required],
      date2:['',Validators.required],
    })
  }
  getAllBusTypes(){
    this.bustypeService.getAll().subscribe(response=>{
      this.busTypes=response.data;
    })
  }
  getBusTypeId(tripId:number){
    this.tripService.getById(tripId).subscribe(response=>{
      this.busTypeId=response.data.busTypeId;
    })
  }
  getAllRouteDto(){
    this.routeService.getAllRouteDto().subscribe(response=>{
      this.routeDtos=response.data;
    })
  } 
  getTrips(){
    let date=this.ticketAddForm.get('date')?.value;
    this.tripService.GetByStartTownIdAndFinishTownId(456,88,date).subscribe(response=>{
      this.tripDtos=response.data;
    })
  }
  selectTrip(tripDto:TripDto){
   // Seçilen sefere ait dolu koltuk numaraları getiriliyor  D.....üzelt
    this.ticketService.getSeatNumberOfTripList(tripDto.id).subscribe(response=>{
    this.bookedSeats=response.data  
      this.getPrice(tripDto.id);
      this.tripDto=tripDto;
      this.busTypeId=tripDto.busTypeId;
    })
    
    
  }
  getPrice(tripId:number){
    this.tripService.getById(tripId).subscribe(response=>{
      this.price=response.data.price;
    })
  }
  returnToHome(){
   this.tripDtos=null;
   this.price=null;

  }
}
