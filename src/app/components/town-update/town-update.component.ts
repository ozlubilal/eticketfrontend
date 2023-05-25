import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { Town } from 'src/app/models/town';
import { CityService } from 'src/app/services/city.service';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-town-update',
  templateUrl: './town-update.component.html',
  styleUrls: ['./town-update.component.css']
})
export class TownUpdateComponent implements OnInit {

  constructor(private townService:TownService,private toastrService:ToastrService,private cityService:CityService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
   townUpdateForm:FormGroup;
   town:Town;
   city:City;
   id:number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getTownById();  
   
    })
  }
  createTownUpdateForm(){
    this.townUpdateForm=this.formBuilder.group({
    
      townName:[this.town.townName,Validators.required],
    })
  }
  getCityById(){
    this.cityService.getById(this.town.cityId).subscribe(response=>{
      this.city=response.data;
    })
  }
  getTownById(){
    this.townService.getById(this.id).subscribe(response=>{
         this.town=response.data;
         this.getCityById(); 
         this.createTownUpdateForm();
        
    })
  } 
  update(){
    if(this.townUpdateForm.valid){
      let townModel:Town={
        id:this.id,
        cityId:this.city.id,
        townName:this.townUpdateForm.get('townName')?.value
      }
      console.log(townModel);
      this.townService.update(townModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
        setTimeout(()=>{                          
          this.router.navigate(['town/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
  }

}