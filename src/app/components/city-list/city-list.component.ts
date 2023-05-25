import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  dataLoaded = false;
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllCity();
  }
  getAllCity() {
    this.cityService.getAll().subscribe((response) => {
      this.cities = response.data;
      this.dataLoaded = true;
    });
  }
  delete(city: City) {
    if (city) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {
        this.cityService.delete(city).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getAllCity();
        },
         responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      }
    }
  }
}
