import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route } from 'src/app/models/route';
import { Town } from 'src/app/models/town';
import { RouteService } from 'src/app/services/route.service';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.component.html',
  styleUrls: ['./route-add.component.css']
})
export class RouteAddComponent implements OnInit {
  routeAddForm:FormGroup;
  towns:Town[];
  constructor(private routeService:RouteService,
    private formBuilder:FormBuilder,private toastrService:ToastrService,private townService:TownService,) { }

  ngOnInit(): void {
    this.createRouteAddForm();
    this.getAllTowns();
  }
  createRouteAddForm(){
    this.routeAddForm=this.formBuilder.group({
      startTownName:['',Validators.required],
      finishTownName:['',Validators.required],
      distance:['',Validators.required],
    })
  }
  getAllTowns(){
    this.townService.getAll().subscribe(response=>{
      this.towns=response.data;
    })
  } 
  add(){
   
         
      let routeModel:Route={
        id:undefined,
        startTownId:Number(this.towns.find(x=>x.townName==this.routeAddForm.get('startTownName')?.value)?.id),
        finishTownId:Number(this.towns.find(x=>x.townName==this.routeAddForm.get('finishTownName')?.value)?.id),
        distance:this.routeAddForm.get('distance')?.value,
      }
      
        this.routeService.add(routeModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      }, responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      })
   
     
  }
}

