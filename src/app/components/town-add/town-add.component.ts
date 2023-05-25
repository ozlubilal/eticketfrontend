import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { Town } from 'src/app/models/town';
import { CityService } from 'src/app/services/city.service';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-town-add',
  templateUrl: './town-add.component.html',
  styleUrls: ['./town-add.component.css']
})
export class TownAddComponent implements OnInit {
  townAddForm:FormGroup;
  cities:City[];
  constructor(private townService:TownService,private cityService:CityService,private formBuilder:FormBuilder,private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createTownAddForm();
  }
  createTownAddForm(){
    this.townAddForm=this.formBuilder.group({
      townName:['',Validators.required],
      cityName:['',Validators.required],
    });
    this.getAllCity();
  }
  getAllCity(){
    this.cityService.getAll().subscribe(response=>{
      this.cities=response.data;
    })
  }
  add(){
    if(this.townAddForm.valid)
    {
      
      let townModel:Town={
        id:undefined ,
        cityId:Number(this.cities.find(x=>x.cityName==this.townAddForm.get('cityName')?.value)?.id),
        townName:this.townAddForm.get('townName')?.value,

      }
      this.townService.add(townModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      })
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }

}
