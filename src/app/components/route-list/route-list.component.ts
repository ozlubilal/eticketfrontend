import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Route } from 'src/app/models/route';
import { RouteDto } from 'src/app/models/routeDto';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  routeDtos: RouteDto[] = [];
  dataLoaded = false;
  constructor(
    private routeService: RouteService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllRouteDto();
  }
  getAllRouteDto() {
    this.routeService.getAllRouteDto().subscribe((response) => {
      this.routeDtos = response.data;
      this.dataLoaded = true;
    });
  }
  delete(id: number) {
    if (id) {
      if (confirm('Silmek istediğinize eminmisiniz? ')) {

        this.routeService.getById(id).subscribe(response=>{
          let route:Route=response.data;        
        this.routeService.delete(route).subscribe((response) => {
          this.toastrService.warning(response.message, 'Başarılı');
          this.getAllRouteDto();
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");}
        );
      })}
    }
  }
}
