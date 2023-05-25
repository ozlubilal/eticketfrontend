import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TripState } from 'src/app/models/tripState';
import { TripStateService } from 'src/app/services/trip-state.service';

@Component({
  selector: 'app-trip-state-list',
  templateUrl: './trip-state-list.component.html',
  styleUrls: ['./trip-state-list.component.css']
})
export class TripStateListComponent implements OnInit {
 tripStates:TripState[];
 dataLoaded=false;
  constructor(  private tripStateService: TripStateService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getTripStates();
  }
  getTripStates() {
    this.tripStateService.getAll().subscribe((response) => {
      this.tripStates = response.data;
      this.dataLoaded = true;
    });
  }
  delete(tripSatate: TripState) {
    if (tripSatate) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {
        this.tripStateService.delete(tripSatate).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getTripStates();
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      }
    }
  }
}
