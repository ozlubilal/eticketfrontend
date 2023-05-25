import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Trip } from 'src/app/models/trip';
import { TripDto } from 'src/app/models/tripDto';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  tripDtos: TripDto[] = [];
  dataLoaded = false;
  constructor(
    private tripService: TripService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllTripDto();
  }
  getAllTripDto() {
    this.tripService.getAllTripDto().subscribe((response) => {
      this.tripDtos = response.data;
      this.dataLoaded = true;
    });
  }
  delete(id: number) {
    if (id) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {

        this.tripService.getById(id).subscribe(response=>{
          let trip:Trip=response.data;        
        this.tripService.delete(trip).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getAllTripDto();
        },responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      })}
    }
  }
}
