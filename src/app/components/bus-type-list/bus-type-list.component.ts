import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BusType } from 'src/app/models/busType';
import { BusTypeService } from 'src/app/services/bus-type.service';

@Component({
  selector: 'app-bus-type-list',
  templateUrl: './bus-type-list.component.html',
  styleUrls: ['./bus-type-list.component.css'],
})
export class BusTypeListComponent implements OnInit {
  busTypes: BusType[] = [];
  dataLoaded = false;
  constructor(
    private busTypeService: BusTypeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBusTypes();
  }
  getBusTypes() {
    this.busTypeService.getAll().subscribe((response) => {
      this.busTypes = response.data;
      this.dataLoaded = true;
    });
  }
  delete(busType: BusType) {
    if (busType) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {
        this.busTypeService.delete(busType).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getBusTypes();
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
      }
    }
  }
}
