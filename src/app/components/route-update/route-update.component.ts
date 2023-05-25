import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Route } from 'src/app/models/route';
import { Town } from 'src/app/models/town';
import { RouteService } from 'src/app/services/route.service';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-route-update',
  templateUrl: './route-update.component.html',
  styleUrls: ['./route-update.component.css'],
})
export class RouteUpdateComponent implements OnInit {
  constructor(
    private routeService: RouteService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private townService: TownService
  ) {}
  routeUpdateForm: FormGroup;
  route: Route;
  towns: Town[];
  id: number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getRouteById();
      this.getAllTowns();
    });
  }
  createRouteUpdateForm() {
    this.routeUpdateForm = this.formBuilder.group({
      id: [this.route.id, Validators.required],
      startTownName: ['', Validators.required],
      finishTownName: ['', Validators.required],
      distance: [this.route.distance, Validators.required],
    });
  }
  getAllTowns() {
    this.townService.getAll().subscribe((response) => {
      this.towns = response.data;
    });
  }
  getRouteById() {
    this.routeService.getById(this.id).subscribe((response) => {
       this.route=response.data;
      this.createRouteUpdateForm();
    });
  }
  update() {
    let routeModel:Route={
      id:this.route.id,
      startTownId:Number(this.towns.find(x=>x.townName==this.routeUpdateForm.get('startTownName')?.value)?.id),
      finishTownId:Number(this.towns.find(x=>x.townName==this.routeUpdateForm.get('finishTownName')?.value)?.id),
      distance:this.routeUpdateForm.get('distance')?.value,
    }
    console.log(routeModel);
    if (this.routeUpdateForm.valid) {
      this.routeService.update(routeModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        }
      );
      setTimeout(() => {
        this.router.navigate(['route/list']);
      }, 5000);
    } else {
      this.toastrService.error('Formu eksiksiz giriniz', 'Başarısız');
    }
   }
}


