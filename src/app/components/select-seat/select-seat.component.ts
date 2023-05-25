import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gender } from 'src/app/models/gender';
import { Ticket } from 'src/app/models/ticket';
import { TripDto } from 'src/app/models/tripDto';
import { UserDto } from 'src/app/models/userDto';
import { GenderService } from 'src/app/services/gender.service';
import { LocalService } from 'src/app/services/local.service';
import { TicketService } from 'src/app/services/ticket.service';


export interface SelectItem {
  id: number,
  number:number,
  isChecked:boolean,
  disabled:boolean,
}
@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css'],
})
export class SelectSeatComponent {
  @Input() price: number;
  @Input() busTypeId: number;
  @Input() bookedSeats: number[];
  @Input() tripDto: TripDto;

  ticketAddForm = this.fb.group({
    phoneNumber: new FormControl('', [Validators.required]),
    tickets: this.fb.array([]),
    email: new FormControl('', [Validators.required]),
  });
  
  userDto:UserDto | null;
  seatNumbers: number[];
  selectedItemsList: SelectItem[] = [];
  checkedIDs: any[] = [];
  seatsAreSelected = false;
  genders: Gender[];
  seats: SelectItem[] = [
    { id: 1, number: 1, isChecked: false, disabled: false },
    { id: 2, number: 2, isChecked: false, disabled: false },
    { id: 3, number: 3, isChecked: false, disabled: false },
    { id: 4, number: 4, isChecked: false, disabled: false },
    { id: 5, number: 5, isChecked: false, disabled: false },
    { id: 6, number: 6, isChecked: false, disabled: false },
    { id: 7, number: 7, isChecked: false, disabled: false },
    { id: 8, number: 8, isChecked: false, disabled: false },
    { id: 9, number: 9, isChecked: false, disabled: false },
    { id: 10, number: 10, isChecked: false, disabled: false },
    { id: 11, number: 11, isChecked: false, disabled: false },
    { id: 12, number: 12, isChecked: false, disabled: false },
    { id: 13, number: 13, isChecked: false, disabled: false },
    { id: 14, number: 14, isChecked: false, disabled: false },
    { id: 15, number: 15, isChecked: false, disabled: false },
    { id: 16, number: 16, isChecked: false, disabled: false },
    { id: 17, number: 17, isChecked: false, disabled: false },
    { id: 18, number: 18, isChecked: false, disabled: false },
    { id: 19, number: 19, isChecked: false, disabled: false },
    { id: 20, number: 20, isChecked: false, disabled: false },
    { id: 21, number: 21, isChecked: false, disabled: false },
    { id: 22, number: 22, isChecked: false, disabled: false },
    { id: 23, number: 23, isChecked: false, disabled: false },
    { id: 24, number: 24, isChecked: false, disabled: false },
    { id: 25, number: 25, isChecked: false, disabled: false },
    { id: 26, number: 26, isChecked: false, disabled: false },
    { id: 27, number: 27, isChecked: false, disabled: false },
    { id: 28, number: 28, isChecked: false, disabled: false },
    { id: 29, number: 29, isChecked: false, disabled: false },
    { id: 30, number: 30, isChecked: false, disabled: false },
    { id: 31, number: 31, isChecked: false, disabled: false },
    { id: 32, number: 32, isChecked: false, disabled: false },
    { id: 33, number: 33, isChecked: false, disabled: false },
    { id: 34, number: 34, isChecked: false, disabled: false },
    { id: 35, number: 35, isChecked: false, disabled: false },
    { id: 36, number: 36, isChecked: false, disabled: false },
    { id: 37, number: 37, isChecked: false, disabled: false },
    { id: 38, number: 38, isChecked: false, disabled: false },
    { id: 39, number: 39, isChecked: false, disabled: false },
    { id: 40, number: 40, isChecked: false, disabled: false },
    { id: 41, number: 41, isChecked: false, disabled: false },
    { id: 42, number: 42, isChecked: false, disabled: false },
    { id: 43, number: 43, isChecked: false, disabled: false },
    { id: 44, number: 44, isChecked: false, disabled: false },
    { id: 45, number: 45, isChecked: false, disabled: false },
    { id: 46, number: 46, isChecked: false, disabled: false },
    { id: 47, number: 47, isChecked: false, disabled: false },
    { id: 48, number: 48, isChecked: false, disabled: false },
  ];
  //verilen iki değer arasında sayı dizisi oluşturuyor
  numSequence(n: number, t: number): Array<number> {
    var num = [];
    for (let i = n; i < t; i++) {
      num.push(i);
      i=i+3
    }

    return num;
  }

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private genderService: GenderService,
    private fb: FormBuilder,
    private toastrService:ToastrService,
    private localService:LocalService,
  ) {}

  ngOnInit() {
    this.setBookedSeats();
  }


  getGenders() {
    this.genderService.getAll().subscribe((response) => {
      this.genders = response.data;
    });
  }
  get tickets() {
    return this.ticketAddForm.controls['tickets'] as FormArray;
  }

  addNewTicket() {
    this.tickets.push(
      this.fb.group({
        seatNumber: [],
        genderName: [],
        identityNumber: [],
        firstName: [],
        lastName: [],
      })
    );
  }

  send() {

   this.userDto=JSON.parse(this.localService.getItem("user_details") || '');  

    if (this.ticketAddForm.valid) {
      let i = 0;
      for (let control of this.tickets.controls) {
        let ticket: Ticket = {
          id: undefined,
          userId: this.userDto?.userId,
          email: this.ticketAddForm.get('email')?.value,
          phoneNumber: this.ticketAddForm.get('phoneNumber')?.value,
          firstName: control.value.firstName,
          lastName: control.value.lastName,
          genderId: Number(this.genders.find((g) => g.genderName == control.value.genderName)?.id),
          identityNumber: control.value.identityNumber,
          SeatNumber: this.selectedItemsList[i].number,
          tripId: this.tripDto.id,
        };
        i = i + 1;
        this.ticketService.add(ticket).subscribe((response) => {
          this.toastrService.success(response.message,"Başarılı")
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      }
    } else {
      this.toastrService.error('Formu eksiksiz doldurunuz.');
    }
  }
  //daha önce satın alınmış koltuk numaralarını seçilemez yapıyoruz
  setBookedSeats() {
    this.seats
      .filter((x) => this.bookedSeats.includes(x.number))
      .forEach((element) => {
        element.disabled = true;
      });
  }

  changeSelection() {
    this.fetchSelectedItems();
    this.setBookedSeats();
  }
  fetchSelectedItems() {
    this.selectedItemsList = this.seats.filter((value, index) => {
      return value.isChecked;
    });
    if (this.selectedItemsList.length == 5) {
      alert('En fazla 4 adet koltuk seçebilirsiniz');
      this.seats .filter((x) => x.isChecked == false) .forEach((element) => {
          element.disabled = true;
        });
    } else {
      this.seats.filter((x) => x.isChecked == false && !this.bookedSeats.includes(x.number)).forEach((element) => {
          element.disabled = false;
        });
    }
  }

  next() {
    this.getGenders();
    this.selectedItemsList.forEach((element) => {
      this.addNewTicket();
    });
    this.seatsAreSelected = true;
  }
}
