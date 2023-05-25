import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Town } from 'src/app/models/town';
import { TownDto } from 'src/app/models/townDto';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-town-list',
  templateUrl: './town-list.component.html',
  styleUrls: ['./town-list.component.css']
})
export class TownListComponent implements OnInit {
  townDtos: TownDto[] = [];
  dataLoaded = false;
  constructor(
    private townService: TownService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTownDtos();
  }
  getTownDtos() {
    this.townService.getAllTownDto().subscribe((response) => {
      this.townDtos = response.data;
      this.dataLoaded = true;
    });
  }
  delete(id: number) {
    if (id) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {
        this.townService.getById(id).subscribe(response=>{
          let town=response.data
          this.townService.delete(town).subscribe((response) => {
            this.toastrService.success(response.message, 'Başarılı');
            this.getTownDtos();
          },
          responseError=>{
            this.toastrService.error(responseError.error,"Başarısız");
          });
        })
       
      }
    }
  }
}