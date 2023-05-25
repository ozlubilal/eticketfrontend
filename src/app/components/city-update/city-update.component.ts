import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.css']
})
export class CityUpdateComponent implements OnInit {
  constructor(private cityService:CityService,private toastrService:ToastrService,
    private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router,) { }
   cityUpdateForm:FormGroup;
  city:City;
  id:number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.id=(params["id"]);
    this.getCityById();
    
    })
  
    
  }
  createCityUpdateForm(){
    this.cityUpdateForm=this.formBuilder.group({
      id:[this.city.id,Validators.required],
      cityName:[this.city.cityName,Validators.required],
    })
  }
  getCityById(){
    this.cityService.getById(this.id).subscribe(response=>{
         this.city=response.data;
         this.createCityUpdateForm();
    })
  }
  update(){
    if(this.cityUpdateForm.valid){
      let cityModel=Object.assign({},this.cityUpdateForm.value);
      this.cityService.update(cityModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });   
        setTimeout(()=>{                          
          this.router.navigate(['city/list'])
      }, 5000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
  }

}

