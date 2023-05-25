import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {
  cityAddForm:FormGroup;
  constructor(private cityService:CityService,private formBuilder:FormBuilder,private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.createCityAddForm();
    
  }
  createCityAddForm(){
    this.cityAddForm=this.formBuilder.group({
      cityName:['',Validators.required],
    });
  }
  add(){
    if(this.cityAddForm.valid)
    {
      console.log("ok");
      let cityModel=Object.assign({},this.cityAddForm.value);
      this.cityService.add(cityModel).subscribe(response=>{
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

